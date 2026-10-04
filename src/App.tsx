import TopoField from './components/ui/topo-field';
import ResizableNavbar from './components/ui/resizable-navbar';
import Hero from './components/sections/Hero';
import StandardsStrip from './components/sections/StandardsStrip';
import AttackSurface from './components/sections/AttackSurface';
import Solutions from './components/sections/Solutions';
import WhyBytesEncrypt from './components/sections/WhyBytesEncrypt';
import Methodology from './components/sections/Methodology';
import SampleReport from './components/sections/SampleReport';
import Academy from './components/sections/Academy';
import AssessmentForm from './components/sections/AssessmentForm';
import FooterSection from './components/ui/footer-section';
import StickyMobileCta from './components/ui/sticky-mobile-cta';

export default function App() {
  return (
    <div className="relative min-h-screen bg-[#050505] text-[#f5f5f3] selection:bg-[#1951FC]/30 selection:text-[#CBE9FD]">
      {/* 1. Global Living Background: TopoField */}
      <TopoField speed={0.6} density={0.8} />

      {/* Atmospheric cobalt depth illumination */}
      <div
        className="fixed inset-0 pointer-events-none z-0"
        style={{
          background: 'radial-gradient(circle at 50% 30%, rgba(25, 81, 252, 0.08), transparent 55%)',
        }}
        aria-hidden="true"
      />

      {/* 2. Top Resizable Floating Navbar */}
      <ResizableNavbar />

      {/* 3. Main Single-Page Content Stream */}
      <main id="main-content" className="relative z-10">
        {/* Section 1: Hero */}
        <Hero />

        {/* Section 2: Standards Strip */}
        <StandardsStrip />

        {/* Section 3: Attack Surface */}
        <AttackSurface />

        {/* Section 4: Solutions */}
        <Solutions />

        {/* Section 5: Why BytesEncrypt */}
        <WhyBytesEncrypt />

        {/* Section 6: Methodology */}
        <Methodology />

        {/* Section 7: Sample Report (Single Light Paper Section) */}
        <SampleReport />

        {/* Section 8: Academy */}
        <Academy />

        {/* Section 9: Assessment Form */}
        <AssessmentForm />
      </main>

      {/* Section 10: Multi-Column Footer */}
      <div className="relative z-10">
        <FooterSection />
      </div>

      {/* Sticky Bottom CTA for Mobile devices */}
      <StickyMobileCta />
    </div>
  );
}
