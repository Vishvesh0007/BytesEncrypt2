import { useEffect, useRef, useState } from 'react';

interface TopoFieldProps {
  speed?: number;
  density?: number;
  opacity?: number;
  className?: string;
}

export default function TopoField({
  speed = 0.6,
  density = 0.8,
  opacity,
  className = '',
}: TopoFieldProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isMobile, setIsMobile] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const [webglSupported, setWebglSupported] = useState(true);

  useEffect(() => {
    const checkMedia = () => {
      setIsMobile(window.innerWidth < 768);
      const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
      setPrefersReducedMotion(motionQuery.matches);
    };

    checkMedia();
    window.addEventListener('resize', checkMedia);
    return () => window.removeEventListener('resize', checkMedia);
  }, []);

  const effectiveOpacity = opacity ?? (isMobile ? 0.7 : 0.88);
  const effectiveSpeed = prefersReducedMotion ? 0 : speed;
  const maxDpr = isMobile ? 1.25 : 1.75;
  const bands = (density * 14).toFixed(1);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    let gl: WebGLRenderingContext | null = null;
    try {
      gl =
        (canvas.getContext('webgl', { alpha: false, antialias: true }) as WebGLRenderingContext) ||
        (canvas.getContext('experimental-webgl', { alpha: false, antialias: true }) as WebGLRenderingContext);
    } catch {
      setWebglSupported(false);
      return;
    }

    if (!gl) {
      setWebglSupported(false);
      return;
    }

    const vsSource = `
      attribute vec2 a_position;
      void main() {
        gl_Position = vec4(a_position, 0.0, 1.0);
      }
    `;

    const fsSource = `
      precision highp float;
      uniform vec2 u_resolution;
      uniform float u_time;
      uniform float u_dpr;

      // Fast simplex noise implementation
      vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
      vec2 mod289(vec2 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
      vec3 permute(vec3 x) { return mod289(((x * 34.0) + 1.0) * x); }

      float snoise(vec2 v) {
        const vec4 C = vec4(0.211324865405187, 0.366025403784439, -0.577350269189626, 0.024390243902439);
        vec2 i  = floor(v + dot(v, C.yy));
        vec2 x0 = v - i + dot(i, C.xx);
        vec2 i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
        vec4 x12 = x0.xyxy + C.xxzz;
        x12.xy -= i1;
        i = mod289(i);
        vec3 p = permute(permute(i.y + vec3(0.0, i1.y, 1.0)) + i.x + vec3(0.0, i1.x, 1.0));
        vec3 m = max(0.5 - vec3(dot(x0,x0), dot(x12.xy,x12.xy), dot(x12.zw,x12.zw)), 0.0);
        m = m * m;
        m = m * m;
        vec3 x = 2.0 * fract(p * C.www) - 1.0;
        vec3 h = abs(x) - 0.5;
        vec3 ox = floor(x + 0.5);
        vec3 a0 = x - ox;
        m *= 1.79284291400159 - 0.85373472095314 * (a0 * a0 + h * h);
        vec3 g;
        g.x  = a0.x  * x0.x  + h.x  * x0.y;
        g.yz = a0.yz * x12.xz + h.yz * x12.yw;
        return 130.0 * dot(m, g);
      }

      void main() {
        vec2 st = gl_FragCoord.xy / u_resolution.xy;
        float aspect = u_resolution.x / u_resolution.y;
        vec2 uv = vec2(st.x * aspect, st.y);

        // 1. Subtle 48px engineering grid
        float gridSize = 48.0 * u_dpr;
        vec2 gridCoord = fract(gl_FragCoord.xy / gridSize);
        vec2 gridDist = abs(gridCoord - 0.5);
        float halfPix = 0.5 / gridSize;
        float gridLine = max(
          smoothstep(0.5 - halfPix * 2.0, 0.5, gridDist.x),
          smoothstep(0.5 - halfPix * 2.0, 0.5, gridDist.y)
        );

        // 2. Dual-octave Topographic Contour Field
        float timeOffset = u_time * 0.035;
        vec2 noiseCoord1 = uv * 1.35 + vec2(timeOffset * 0.4, timeOffset * 0.7);
        vec2 noiseCoord2 = uv * 0.65 - vec2(timeOffset * 0.5, timeOffset * 0.3);

        float n1 = snoise(noiseCoord1) * 0.5 + 0.5;
        float n2 = snoise(noiseCoord2) * 0.5 + 0.5;
        float n = mix(n1, n2, 0.35);

        // Contour bands
        float numBands = ${bands};
        float bandVal = n * numBands;
        float bandFrac = fract(bandVal);
        float distToLine = min(bandFrac, 1.0 - bandFrac);

        // Regular contour lines (crisp, anti-aliased)
        float topoLine = 1.0 - smoothstep(0.015, 0.065, distToLine);

        // Major index contour lines (every 4th band is slightly brighter and bolder)
        float indexBandFrac = fract(bandVal / 4.0);
        float distToIndex = min(indexBandFrac * 4.0, 4.0 - indexBandFrac * 4.0);
        float indexLine = 1.0 - smoothstep(0.015, 0.075, distToIndex);

        // Atmospheric illumination
        vec3 bg = vec3(0.02, 0.02, 0.02); // #050505
        vec3 gridColor = vec3(0.12, 0.38, 0.98); // Cobalt #1951FC
        vec3 topoColor = vec3(0.22, 0.52, 0.99); // Sky #3781FC
        vec3 indexColor = vec3(0.78, 0.90, 0.99); // Soft Ice #CBE9FD

        // Ambient depth glow
        float depthGlow = pow(n, 2.2) * 0.25;
        vec3 glowColor = vec3(0.02, 0.12, 0.38) * depthGlow;

        vec3 finalColor = bg;
        finalColor += glowColor;
        finalColor += gridColor * (gridLine * 0.08);
        finalColor += topoColor * (topoLine * 0.48);
        finalColor += indexColor * (indexLine * 0.32);

        gl_FragColor = vec4(finalColor, 1.0);
      }
    `;

    function createShader(glCtx: WebGLRenderingContext, type: number, source: string) {
      const shader = glCtx.createShader(type);
      if (!shader) return null;
      glCtx.shaderSource(shader, source);
      glCtx.compileShader(shader);
      if (!glCtx.getShaderParameter(shader, glCtx.COMPILE_STATUS)) {
        console.error('Shader compile error:', glCtx.getShaderInfoLog(shader));
        glCtx.deleteShader(shader);
        return null;
      }
      return shader;
    }

    const vertexShader = createShader(gl, gl.VERTEX_SHADER, vsSource);
    const fragmentShader = createShader(gl, gl.FRAGMENT_SHADER, fsSource);
    if (!vertexShader || !fragmentShader) {
      setWebglSupported(false);
      return;
    }

    const program = gl.createProgram();
    if (!program) {
      setWebglSupported(false);
      return;
    }

    gl.attachShader(program, vertexShader);
    gl.attachShader(program, fragmentShader);
    gl.linkProgram(program);

    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      console.error('Program link error:', gl.getProgramInfoLog(program));
      setWebglSupported(false);
      return;
    }

    gl.useProgram(program);

    const buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array([-1, -1, 1, -1, -1, 1, -1, 1, 1, -1, 1, 1]),
      gl.STATIC_DRAW
    );

    const posLoc = gl.getAttribLocation(program, 'a_position');
    gl.enableVertexAttribArray(posLoc);
    gl.vertexAttribPointer(posLoc, 2, gl.FLOAT, false, 0, 0);

    const resLoc = gl.getUniformLocation(program, 'u_resolution');
    const timeLoc = gl.getUniformLocation(program, 'u_time');
    const dprLoc = gl.getUniformLocation(program, 'u_dpr');

    let currentDpr = 1;
    function resize() {
      if (!canvas || !gl) return;
      currentDpr = Math.min(window.devicePixelRatio || 1, maxDpr);
      const displayWidth = Math.floor(window.innerWidth * currentDpr);
      const displayHeight = Math.floor(window.innerHeight * currentDpr);

      if (canvas.width !== displayWidth || canvas.height !== displayHeight) {
        canvas.width = displayWidth;
        canvas.height = displayHeight;
      }

      gl.viewport(0, 0, canvas.width, canvas.height);
      gl.uniform2f(resLoc, canvas.width, canvas.height);
      gl.uniform1f(dprLoc, currentDpr);
    }

    window.addEventListener('resize', resize);
    resize();

    let animId = 0;
    const startTime = performance.now();
    let virtualTime = 0;
    let lastTime = startTime;

    function render(now: number) {
      if (!gl) return;
      const delta = (now - lastTime) * 0.001;
      lastTime = now;
      virtualTime += delta * effectiveSpeed;

      gl.uniform1f(timeLoc, virtualTime);
      gl.drawArrays(gl.TRIANGLES, 0, 6);

      animId = requestAnimationFrame(render);
    }

    animId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', resize);
      if (gl) {
        gl.deleteBuffer(buffer);
        gl.deleteProgram(program);
        gl.deleteShader(vertexShader);
        gl.deleteShader(fragmentShader);
      }
    };
  }, [bands, effectiveSpeed, maxDpr]);

  if (!webglSupported) {
    return (
      <div
        className={`fixed inset-0 z-0 pointer-events-none grid-bg-fallback ${className}`}
        style={{ opacity: effectiveOpacity }}
        aria-hidden="true"
        tabIndex={-1}
      />
    );
  }

  return (
    <div
      className={`fixed inset-0 z-0 pointer-events-none overflow-hidden transition-opacity duration-700 ${className}`}
      style={{ opacity: effectiveOpacity }}
      aria-hidden="true"
      tabIndex={-1}
    >
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full block pointer-events-none"
      />
      {/* Balanced atmospheric vignettes for contrast & text readability */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#050505]/60 via-transparent to-[#050505]/75 pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_35%,#050505_95%)] opacity-55 pointer-events-none" />
    </div>
  );
}
