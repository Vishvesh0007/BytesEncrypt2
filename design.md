# BytesEncrypt — Landing Page `design.md`

Single landing page, ten calm sections, one living background. Neat, spacious, premium. Nothing decorative that doesn't explain security or help conversion.

---

## 1. Goal and scope

- **One page** (`/`), sections reached by anchor links. No sub-pages in this build.
- **Primary action:** Request an assessment. **Secondary:** View solutions.
- **Audience:** CTOs, CISOs, engineering managers, founders, compliance owners; students as a minor secondary audience (Academy section).
- **Positioning:** Offensive security and assurance partner. Manual-first testing, plain-language reports, retest included.
- **Not:** a monitoring SaaS, an autonomous pentest tool, or a "hacker" theme. Do not use "Live security monitoring."

### Design principles
1. **Restraint.** Few components, generous space, hairline borders, one accent colour.
2. **One motion language.** Slow, eased reveals; the background is the only continuous animation.
3. **Honesty.** Illustrative visuals are labelled as illustrative. No invented proof (see section 11).
4. **Readable first.** Text always sits on a calm surface; the background fades behind content.

---

## 2. What was taken from the SentientX reference

Observed from the supplied screenshot (approximate; the image is low resolution, so values are matched by eye):

| Aspect | Observation | How we use it |
|---|---|---|
| Page ground | Near-white neutral (`~#f6f6f4`) | One light "paper" section for contrast (sample report) |
| Surfaces | Charcoal tiles with a soft lighter vignette, not flat black | Dark cards use a subtle radial lift |
| Accent | Pale mint button; a yellow pill in the dock | Mint as the single brand accent; yellow reserved for the "Medium" severity chip |
| Typography | Light neo-grotesque sans, tight tracking, large centered wordmark; tiny captions with an arrow and underlined link (`Header → Footer`) | Light display weight, tight tracking, mono micro-labels with arrow captions |
| Layout | Centered hero, lots of vertical air, 2-column tile grid with captions underneath | Centered hero; captions under tiles; wide gutters |
| Controls | Pill shapes, small dock navigation | Pill buttons, floating resizable navbar |

---

## 3. Colour system

Dark is the default. A single light "paper" section provides rhythm. Define as CSS variables, map in Tailwind.

```css
:root {
  /* Dark ground */
  --bg:            #050505;
  --bg-raised:     #0b0b0a;
  --surface:       #111110;
  --surface-2:     #1a1a18;
  --line:          rgba(255,255,255,0.10);
  --line-strong:   rgba(255,255,255,0.18);

  /* Text on dark */
  --text:          #f5f5f3;
  --text-muted:    #a3a3a0;   /* body secondary, ~7:1 on --bg */
  --text-dim:      #8a8a86;   /* labels, captions; do not go darker */

  /* Paper section (light) */
  --paper:         #f4f4f2;
  --paper-2:       #eaeae7;
  --ink:           #111110;
  --ink-muted:     #5c5c58;
  --paper-line:    rgba(17,17,16,0.12);

  /* Centralized Cobalt-Blue Color System */
  --cobalt-950:    #03195B;   /* primary dark cobalt / deep bg glow */
  --cobalt-800:    #0B2CB1;   /* deep cobalt / secondary depth */
  --cobalt-600:    #1951FC;   /* primary electric blue / primary interactive & accent */
  --cobalt-500:    #3781FC;   /* bright blue & sky blue / highlights, active states */
  --cobalt-100:    #CBE9FD;   /* soft ice blue / soft highlights, subtle glow */

  /* Accent */
  --accent:        #CBE9FD;   /* soft ice blue, primary buttons and highlights */
  --accent-strong: #3781FC;   /* status "verified" dot, focus ring, active highlights */
  --accent-ink:    #03195B;   /* text on accent */

  /* Severity (sample report only) */
  --sev-critical:  #ff6b5e;
  --sev-high:      #ffa94d;
  --sev-medium:    #f3e45a;
  --sev-low:       #3781FC;

  --radius-sm: 10px;
  --radius-md: 16px;
  --radius-lg: 24px;
  --radius-pill: 999px;
}
```

Rules:
- Accent appears on: primary buttons, the "verified" status, focus ring, one highlighted word in a headline at most. Never as large fills.
- No purple, no rainbow gradients. The only gradient allowed is the white-to-grey text fade on the hero headline.
- Severity colours appear only inside the sample report.

---

## 4. Typography

Exact font in the reference cannot be identified from the screenshot, so use a close, free equivalent.

| Role | Font | Weight | Notes |
|---|---|---|---|
| Display and headings | **Geist** (fallback: Inter Tight, system-ui) | 300 | Tight tracking `-0.03em` |
| Body | **Geist** | 300–400 | Line height 1.6 |
| Micro-labels, terminal, metadata | **Geist Mono** (fallback: JetBrains Mono, ui-monospace) | 400 | Uppercase, tracking `0.08em` |

Load with `font-display: swap`, self-host (or via Google Fonts) with real fallback stacks.

Scale:

| Token | Size | Line height | Use |
|---|---|---|---|
| `display` | `clamp(2.75rem, 7vw, 6rem)` | 1.05 | Hero H1 |
| `h2` | `clamp(2rem, 4.5vw, 3.5rem)` | 1.1 | Section headings |
| `h3` | `1.25rem` | 1.3 | Card and row titles |
| `body-lg` | `1.125rem` | 1.6 | Hero paragraph, section intros |
| `body` | `1rem` | 1.6 | Default |
| `small` | `0.875rem` | 1.5 | Descriptions in cards |
| `label` | `0.75rem` mono | 1.4 | Eyebrows, captions, status chips |

Patterns:
- **Eyebrow:** mono label above each H2 (for example `01 — ATTACK SURFACE`).
- **Caption with arrow:** `Application → Web · API · Mobile`, link underlined on hover (mirrors the reference captions).
- **Hero headline:** last phrase in a white-to-`neutral-600` text gradient; the rest solid `--text`.
- One text effect only: masked word reveal on headings (CSS or `motion`). No typewriter, no scramble.

---

## 5. Layout system

- Container: `max-w-[1200px]`, `px-6` mobile, `px-10` desktop. 12-column grid, 8px base spacing.
- Section padding: `py-24` mobile, `py-32` desktop. Hero is `min-h-[100svh]`.
- Cards: `--radius-lg`, 1px `--line` border, `--surface` fill with a faint radial lift (`radial-gradient(120% 80% at 50% 0%, rgba(255,255,255,0.06), transparent 60%)`).
- Dividers are hairlines; no heavy shadows.
- Mobile: single column, CTA stays reachable (navbar button plus a sticky bottom "Request assessment" bar after the hero).

---

## 6. Background: TopoField

A faint 48px grid plus ultra-thin topographic contour lines, drifting slowly. It is fixed behind the whole page.

### Integration
- Mount once, fixed, `z-0`, `pointer-events: none`, above it a vignette: top fade and radial edge fade (same overlays as in the supplied source) so text stays readable.
- Content wrapper `relative z-10`.
- The paper section has a solid `--paper` background and covers the field entirely.

### Settings
| Prop | Value | Why |
|---|---|---|
| `mode` | `"dark"` | Page is dark by default |
| `speed` | `0.6` | Slower, calmer drift |
| `density` | `0.8` | Fewer contour bands |
| `length` | `1` | Default noise scale |
| `opacity` | `0.55` desktop, `0.35` mobile | Keeps copy readable |

### Required adjustments to the supplied component
1. **Strip the embedded demo page.** `topoFieldSource` includes a whole demo site (Tailwind CDN, Iconify, GSAP, ScrollTrigger, hero markup) that is then hidden by the isolation script. Replace it with a minimal document containing only the `<canvas id="topo-canvas">` and the shader script. This removes several third-party downloads, speeds up first paint, and avoids breaking a strict Content-Security-Policy (a `srcdoc` iframe inherits the parent's CSP).
2. **Tint the lines.** `hue`, `saturation` and `brightness` filters have no visible effect on pure white lines. To add a cool tint, change the two additive colour lines in the shader from `vec3(1.0)` to a slightly cool white such as `vec3(0.86, 0.95, 1.0)`.
3. **Reduced motion.** When `prefers-reduced-motion: reduce`, pass `speed={0}` so the field renders as a still frame.
4. **Device scaling.** Clamp device pixel ratio to `Math.min(devicePixelRatio, 1.75)` on desktop and `1.25` on mobile.
5. **Fallback.** If WebGL is unavailable, show a static CSS grid background (see grid snippet in the components list); the page must remain fully usable.
6. **Keep `sandbox="allow-scripts"`** and keep it out of the accessibility tree (`aria-hidden="true"`, `tabIndex={-1}`).

No dev-only tuner HUD in this build.

---

## 7. Component decisions

Source: the supplied Aceternity UI, React Bits and shadcn-style components. Keep few; remove the rest.

### Keep (and adapt)

| Component | Where | Adaptation |
|---|---|---|
| **Resizable Navbar** | Header | Anchor links only. Remove "Login". One primary button: *Request assessment* (mint pill). |
| **TopoField** | Global background | See section 6. |
| **Terminal** | Hero ("illustrative security trace") | Replace macOS red/yellow/green dots with a mono label `ILLUSTRATIVE SECURITY TRACE`. Mint text for completed steps. |
| **Bento Grid** + **Glowing Effect** | Attack surface | Four tiles. Glow in mint at low intensity. Remove skeleton placeholders; use small SVG node diagrams. |
| **Timeline** | Methodology | Four steps with the scroll-linked line. Remove sample images and lorem. |
| **Border Glow (React Bits "Moving Border")** | Assessment form card only | Colours `['#d6f5c4', '#8fe388', '#b9e4ff']`, background `#0b0b0a`. One use on the page. |
| **Signup form layout** (Label, Input) | Assessment form | Remove password and social buttons. Keep label and input styling. |
| **Footer** (animated, multi-column) | Footer | Rename brand, set columns below, remove YouTube, add X. Keep its reduced-motion handling. |
| **Grid background** (CSS) | Fallback and paper section | `40px` hairline grid, masked radially. |

### Remove (not needed for a clean landing page)

| Component | Reason |
|---|---|
| Background Beams (Three.js) | Heavy bundle; competes with TopoField |
| Aurora (OGL) | Second shader background; conflicts with TopoField |
| Wobble Card, Card Stack, Infinite Moving Cards, Animated Testimonials | Playful or placeholder-driven; no verified testimonials |
| Logo Cloud / LogoLoop | No verified client logos; a text standards strip replaces it |
| Stats sections | No verified numbers to show |
| Compare slider | Image-based; a simple two-column comparison is clearer |
| Expandable Card (modal) | Heavy modal with images; use accessible accordion rows instead |
| Card Spotlight, Card Hover Effect | Redundant with Glowing Effect; one hover system only |
| Typewriter, Encrypted Text | Gimmicky next to the masked reveal; avoid text-effect clutter |
| Tracing Beam | Timeline already provides the scroll line |
| Sticky Scroll Reveal | Too long for a compact landing page |
| Code Block, Animated Tooltip, Placeholders and Vanish Input | Not needed; team data is unverified |

### Dependencies
`react`, `tailwindcss`, `motion` (for `motion/react`), `lucide-react`, `clsx`, `tailwind-merge`. No GSAP, no Three.js, no OGL. Add `@tabler/icons-react` only if Bento icons need it; otherwise Lucide.

### Hygiene when copying the demos
The supplied demos contain placeholder content that must not ship: lorem ipsum, music and celebrity cards, the "OnlyFans" social button, stock Unsplash photos, fake dollar stats, and `type="twitterpassword"`. Rebuild each component with real BytesEncrypt content only.

---

## 8. Page structure (top to bottom)

Each section: eyebrow label, H2, one-sentence intro, content. Reveal once on scroll.

### 0. Navbar
Logo · Attack surface · Solutions · Approach · Report · Academy · **Request assessment**. Resizes (shrinks, blur) after scroll. Mobile: drawer with the same links and a full-width mint button.

### 1. Hero (`#top`)
- Eyebrow pill: `Offensive security & assurance`
- H1: **A health check for your entire attack surface.**
- Paragraph: BytesEncrypt Technologies is an offensive security and assurance partner. We test applications, networks, cloud environments and people to uncover real security weaknesses, then tell you exactly what to fix.
- Buttons: **Request an assessment** (mint) · **View solutions** (ghost, 1px border).
- Terminal card below or beside, labelled `ILLUSTRATIVE SECURITY TRACE`:
  ```
  > scope & recon        attack surface mapped
  > assess & exploit     exploit path identified
  > finding              broken access control (example)
  > report               severity · evidence · fix guidance
  > retest               fix verified
  ```
- Desktop: copy left, terminal right (or centered stack at narrower widths). Mobile: copy, buttons, terminal.

### 2. Standards strip
Text-only row: `OWASP · NIST · PTES · CVSS`, each a mono label with a hairline separator. Line beneath: "Methodologies we align our testing to." No logos, no certification badges.

### 3. Attack surface (`#attack-surface`)
H2: **One attack surface. Multiple entry points.** Bento grid, four tiles with Glowing Effect:
- **Application** — Web · API · Mobile
- **Network** — Infra · Wi-Fi · Edge
- **Cloud** — AWS · Azure · GCP
- **People** — Phishing · Social engineering

Each tile: small node-diagram SVG, title, one line of scope. Caption with arrow under the title.

### 4. Solutions (`#solutions`)
H2: **Security testing built around real attack paths.** A grouped accordion list (not a card grid): seven rows, each expands to show scope bullets, deliverables, and a "Request assessment" link.
1. Application security — web app VAPT, API, mobile, business logic
2. Network security — internal and external VAPT, Wi-Fi, network devices
3. Cloud security — AWS, Azure, GCP, configuration review
4. Offensive security — red teaming, adversary simulation, phishing, social engineering
5. Code security — manual and tool-assisted secure code review
6. AI security — LLM security, prompt injection, guardrail testing
7. Assurance and advisory — risk assessment, maturity, compliance gap, roadmap

First row open by default. Keyboard accessible (`button` with `aria-expanded`).

### 5. Why BytesEncrypt
H2: **Clarity, not just a scan report.** Three columns with large light numerals:
- **01 Manual-first testing** — Automated scanners find the obvious. Our testers chase the exploit paths a scanner can't see.
- **02 Plain-language reports** — Every finding is written for the engineer who has to fix it, not just the auditor who has to file it.
- **03 Retest included** — We don't close a finding until we've verified the fix ourselves.

Beneath: a simple two-column comparison, no slider. *Automated scan:* scan → alerts → duplicates → false positives → manual interpretation. *Manual assessment:* attack surface → recon → human analysis → exploit path → proof → remediation → retest → verified. No claims about named competitors.

### 6. Methodology (`#approach`)
H2: **From scope to retest. No shortcuts.** Timeline component, four steps with the scroll-linked line:
1. **Scope & recon** — assets, entry points, attack surface, business objectives
2. **Assess & exploit** — manual testing supported by tooling
3. **Report findings** — severity, evidence, reproduction steps, impact, remediation guidance
4. **Retest & verify** — confirm that fixes actually close the findings

### 7. Sample report (`#report`) — light paper section
Full-width `--paper` background; this is the one light section. H2: **See what the deliverable looks like.** A redacted report card (ink on paper, hairline border):

```
CRITICAL · Authentication bypass (example)
Affected asset   /api/account
Evidence         ████████████████
Impact           Unauthorized access to account data
Remediation      ████████████████
Status           Ready for retest
```
Severity chip uses `--sev-critical`; status dot uses `--accent-strong`. Button: **Download sample report** (ink pill). Label beneath: "Illustrative example with redacted details. Not a real client finding." Email gating only if the backend exists; otherwise a plain download or request link.

### 8. Academy (`#academy`)
H2: **BytesEncrypt Academy.** Two large simple cards, no effects beyond a hairline hover:
- **Trainings** — Hands-on sessions: Ethical Hacking, SOC, DFIR, Malware Analysis, Network Defense, Red/Blue Team.
- **Bootcamps** — Practical programs with realistic labs, mentorship, certifications and job assistance. **[CONFIRM: wording, certifications, job assistance claims]**

Mono strip beneath: `LEARN → PRACTICE → BUILD → CERTIFY → LAUNCH`. CTA: *Ask about upcoming batches*. No fees, dates, trainer names or placement figures until confirmed.

### 9. Final CTA and assessment form (`#contact`)
H2: **Ready for your first checkup?** Intro: "Tell us what to scope. We'll come back with a plan and timeline, not a sales deck."

Form inside the Border Glow card:
- Name *, Organization *, Work email *, Phone
- What should we scope? * (checkboxes: Web application, API, Mobile application, Network, Cloud, Code review, Red team, Social engineering, Not sure)
- Approximate size, Compliance driver, Target start date, Additional details
- Consent checkbox * (plain language: "I agree that BytesEncrypt may use these details to respond to my request.")
- Button: **Request an assessment** (mint)
- Success message: "Thanks. Your request has been received. We'll review the scope and follow up with the next steps."

States: idle, validating (inline errors under fields, not alerts), loading (button spinner), success, error. Do not promise a response time. Do not claim "no CRM in the middle."

### 10. Footer
Animated multi-column footer. Columns: **Company** (About, Approach, Contact) · **Solutions** (Application, Network, Cloud, Offensive, Code, AI, Advisory) · **Academy** (Trainings, Bootcamps) · **Legal** (Privacy, Terms, Responsible disclosure) · Social (Facebook, X, LinkedIn, Instagram).
Contact: `contact@bytesencrypt.com` · `+91 9113962011` · Kalyan Nagar, Bangalore, KAR-560043.
Copyright line: © BytesEncrypt Technologies Pvt Ltd. Do not include the word "Confidential."

Social URLs:
- Facebook: https://www.facebook.com/profile.php?id=61593238796805
- X: https://x.com/bytes_encrypt
- LinkedIn: https://www.linkedin.com/company/bytesencrypt
- Instagram: https://www.instagram.com/bytesencryptofficial

---

## 9. Motion

| Element | Motion | Duration / ease |
|---|---|---|
| Headings | Masked word reveal, 50ms stagger | 0.9s, `cubic-bezier(.16,1,.3,1)` |
| Sections and cards | Fade + 12px rise, once | 0.7s, same ease |
| Navbar | Resize and blur on scroll | spring (stiffness 260, damping 28) |
| Terminal | Lines appear in sequence, once | 0.3s per line |
| Timeline | Line grows with scroll progress | linked to scroll |
| Glow, hover | Cursor-proximity edge glow, pointer devices only | `@media (pointer: fine)` |
| Background | Slow continuous drift | `speed 0.6` |

Rules: no bounce, no rotation, no parallax stacks, nothing animating while the visitor is reading body text except the background. Under `prefers-reduced-motion`: background still, reveals become instant fades, terminal shows its final state, glow off.

---

## 10. Quality bars

**Accessibility (WCAG 2.1 AA):** semantic landmarks, one H1, visible focus ring (`--accent-strong`, 2px offset), labelled inputs, error text linked with `aria-describedby`, keyboard-operable accordion and navbar, contrast checked on every text and surface pair, skip-to-content link.

**Performance:** Lighthouse 90+ target. Lazy-load below-the-fold sections, no layout shift from fonts or the background, only one WebGL context on the page, background paused or static on low-power or reduced-motion.

**SEO:** title `BytesEncrypt Technologies | Offensive Cybersecurity & Security Assurance`; description: "BytesEncrypt Technologies provides offensive security, VAPT, red teaming, application security, cloud security, AI security and cybersecurity assurance services for organizations." Open Graph and Twitter tags, canonical URL, `Organization` JSON-LD, `robots.txt`, `sitemap.xml`.

**Site security (it is a security company's site):** HTTPS and HSTS, Content-Security-Policy, `X-Content-Type-Options`, `frame-ancestors`/`X-Frame-Options`, `Referrer-Policy`, `Permissions-Policy`; form with server-side validation, sanitisation, CSRF token, rate limiting, honeypot, parameterised queries, no secrets in client code; `/.well-known/security.txt`.

**Privacy:** short privacy policy and consent line on the form; load analytics only after consent. Lead retention period **[CONFIRM]**.

---

## 11. Truthfulness rules

Never show unless confirmed: founding year, certifications, empanelments, client names or logos, testimonials, case studies, team members, number of assessments or students, years of experience, awards, placement figures, response-time promises, "24/7" or "live monitoring" claims. Illustrative visuals are always labelled as illustrative. Missing facts stay as `[CONFIRM: …]` placeholders in the source and are hidden in production.

### Items to confirm before launch
- Certifications and standards the company formally holds
- Founding year and company story wording
- Whether Academy certifications and job assistance are offered, plus fees and batch dates
- Sample report file (real redacted document) and whether email gating is wanted
- Where leads are stored and who is notified; lead retention period
- Booking or calendar tool, if any
- Legal text review (privacy, terms, responsible disclosure)

---

## 12. Suggested file structure

```
src/
  components/
    ui/            resizable-navbar, bento-grid, glowing-effect, timeline,
                   terminal, border-glow, footer-section, topo-field
    sections/      Hero, StandardsStrip, AttackSurface, Solutions,
                   WhyBytesEncrypt, Methodology, SampleReport, Academy,
                   AssessmentForm
  data/            solutions.ts, methodology.ts, navigation.ts
  styles/          tokens.css, globals.css
  App.tsx
```

Content lives in `data/` so copy changes never touch components.

---

## 13. Acceptance checklist

- [ ] Ten sections in the order above, all reachable from the navbar
- [ ] Only the components listed under **Keep**; none from **Remove**
- [ ] TopoField uses the lean document (no demo page or CDN scripts inside it) and is static when motion is reduced
- [ ] Palette and type match the tokens in sections 3 and 4
- [ ] Exactly one light (paper) section
- [ ] No placeholder content from the demos (lorem, stock photos, social buttons, fake stats)
- [ ] No unverified claims; every unknown is a [CONFIRM] item
- [ ] Form validates, shows all states, and is secured as described
- [ ] Keyboard-only navigation works; contrast passes AA
- [ ] Production build succeeds with no console errors
