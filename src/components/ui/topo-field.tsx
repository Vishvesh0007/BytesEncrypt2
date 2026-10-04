import { useEffect, useMemo, useRef, useState } from 'react';

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
  const iframeRef = useRef<HTMLIFrameElement>(null);
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

    // Test WebGL support
    try {
      const testCanvas = document.createElement('canvas');
      const gl = testCanvas.getContext('webgl') || testCanvas.getContext('experimental-webgl');
      if (!gl) setWebglSupported(false);
    } catch {
      setWebglSupported(false);
    }

    return () => window.removeEventListener('resize', checkMedia);
  }, []);

  const effectiveOpacity = opacity ?? (isMobile ? 0.35 : 0.55);
  const effectiveSpeed = prefersReducedMotion ? 0 : speed;
  const maxDpr = isMobile ? 1.25 : 1.75;
  const bands = (density * 10).toFixed(1);

  // Minimal, lean HTML/WebGL document without external libraries or demo bloat
  const srcDoc = useMemo(() => {
    return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <style>
    html, body {
      margin: 0;
      padding: 0;
      width: 100%;
      height: 100%;
      overflow: hidden;
      background: #050505;
    }
    canvas {
      position: fixed;
      inset: 0;
      width: 100%;
      height: 100%;
      display: block;
    }
  </style>
</head>
<body>
  <canvas id="topo-canvas"></canvas>
  <script>
    (function() {
      const canvas = document.getElementById('topo-canvas');
      const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
      if (!gl) return;

      const vsSource = \`
        attribute vec2 a_position;
        void main() {
          gl_Position = vec4(a_position, 0.0, 1.0);
        }
      \`;

      const fsSource = \`
        precision highp float;
        uniform vec2 u_resolution;
        uniform float u_time;
        uniform float u_dpr;

        vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
        vec2 mod289(vec2 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
        vec3 permute(vec3 x) { return mod289(((x*34.0)+1.0)*x); }

        float snoise(vec2 v) {
          const vec4 C = vec4(0.211324865405187, 0.366025403784439, -0.577350269189626, 0.024390243902439);
          vec2 i  = floor(v + dot(v, C.yy));
          vec2 x0 = v -   i + dot(i, C.xx);
          vec2 i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
          vec4 x12 = x0.xyxy + C.xxzz;
          x12.xy -= i1;
          i = mod289(i);
          vec3 p = permute(permute(i.y + vec3(0.0, i1.y, 1.0)) + i.x + vec3(0.0, i1.x, 1.0));
          vec3 m = max(0.5 - vec3(dot(x0,x0), dot(x12.xy,x12.xy), dot(x12.zw,x12.zw)), 0.0);
          m = m*m;
          m = m*m;
          vec3 x = 2.0 * fract(p * C.www) - 1.0;
          vec3 h = abs(x) - 0.5;
          vec3 ox = floor(x + 0.5);
          vec3 a0 = x - ox;
          m *= 1.79284291400159 - 0.85373472095314 * (a0*a0 + h*h);
          vec3 g;
          g.x  = a0.x  * x0.x  + h.x  * x0.y;
          g.yz = a0.yz * x12.xz + h.yz * x12.yw;
          return 130.0 * dot(m, g);
        }

        void main() {
          vec2 st = gl_FragCoord.xy / u_resolution.xy;
          st.x *= u_resolution.x / u_resolution.y;

          // 48px physical grid
          float gridSize = 48.0 * u_dpr;
          vec2 gridSt = gl_FragCoord.xy / gridSize;
          vec2 gridFract = fract(gridSt);
          float lineThickness = 1.0 / gridSize;
          float gridLines = step(1.0 - lineThickness, gridFract.x) + step(1.0 - lineThickness, gridFract.y);
          gridLines = clamp(gridLines, 0.0, 1.0) * 0.06;

          // Ultra-thin Topographic Lines with subtle cobalt-blue illumination
          float noiseScale = 1.4;
          vec2 noisePos = st * noiseScale + vec2(u_time * 0.015, u_time * 0.025);
          float n = snoise(noisePos) * 0.5 + 0.5;
          float numBands = ${bands};
          float bandVal = n * numBands;
          float triangleWave = abs(fract(bandVal) - 0.5) * 2.0;

          float topoLines = smoothstep(0.02, 0.00, triangleWave) * 0.22;

          // Subtle Cobalt Blue tint (rgb(55, 129, 252) / #3781FC)
          vec3 cobaltTint = vec3(0.216, 0.506, 0.988);
          vec3 color = vec3(0.0);
          color += cobaltTint * gridLines;
          color += cobaltTint * topoLines;

          gl_FragColor = vec4(color, 1.0);
        }
      \`;

      function createShader(gl, type, source) {
        const shader = gl.createShader(type);
        gl.shaderSource(shader, source);
        gl.compileShader(shader);
        return shader;
      }

      const vertexShader = createShader(gl, gl.VERTEX_SHADER, vsSource);
      const fragmentShader = createShader(gl, gl.FRAGMENT_SHADER, fsSource);
      const program = gl.createProgram();
      gl.attachShader(program, vertexShader);
      gl.attachShader(program, fragmentShader);
      gl.linkProgram(program);
      gl.useProgram(program);

      const buffer = gl.createBuffer();
      gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
      gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 1, -1, -1, 1, -1, 1, 1, -1, 1, 1]), gl.STATIC_DRAW);

      const posLoc = gl.getAttribLocation(program, "a_position");
      gl.enableVertexAttribArray(posLoc);
      gl.vertexAttribPointer(posLoc, 2, gl.FLOAT, false, 0, 0);

      const resLoc = gl.getUniformLocation(program, "u_resolution");
      const timeLoc = gl.getUniformLocation(program, "u_time");
      const dprLoc = gl.getUniformLocation(program, "u_dpr");

      let currentDpr = 1;
      function resize() {
        currentDpr = Math.min(window.devicePixelRatio || 1, ${maxDpr});
        canvas.width = Math.floor(window.innerWidth * currentDpr);
        canvas.height = Math.floor(window.innerHeight * currentDpr);
        gl.viewport(0, 0, canvas.width, canvas.height);
        gl.uniform2f(resLoc, canvas.width, canvas.height);
        gl.uniform1f(dprLoc, currentDpr);
      }
      window.addEventListener('resize', resize);
      resize();

      let startTime = performance.now();
      let simSpeed = ${effectiveSpeed};
      let virtualTime = 0;
      let lastTime = startTime;

      function render(now) {
        const delta = (now - lastTime) * 0.001;
        lastTime = now;
        virtualTime += delta * simSpeed;

        gl.uniform1f(timeLoc, virtualTime);
        gl.drawArrays(gl.TRIANGLES, 0, 6);
        requestAnimationFrame(render);
      }
      requestAnimationFrame(render);
    })();
  </script>
</body>
</html>`;
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
      <iframe
        ref={iframeRef}
        srcDoc={srcDoc}
        title="Background Terrain Shader"
        className="w-full h-full border-none pointer-events-none"
        sandbox="allow-scripts"
        aria-hidden="true"
        tabIndex={-1}
      />
      {/* Vignette overlays for text readability */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#050505]/70 via-transparent to-[#050505] pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,#050505_100%)] opacity-90 pointer-events-none" />
    </div>
  );
}
