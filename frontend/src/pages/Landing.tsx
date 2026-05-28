// Landing page – Core Layout & Global Theme
import { Button } from "@/components/ui/button";
import { Logo } from "@/components/ui/Logo";
import { ArrowRight } from "lucide-react";
import { useEffect, useState } from "react";

export function Landing({ onEnterApp }: { onEnterApp: () => void }) {
  // State for CTA animation
  const [isEntering, setIsEntering] = useState(false);

  const handleEnterApp = () => {
    setIsEntering(true);
    setTimeout(() => onEnterApp(), 800);
  };

  // Ensure smooth fonts globally
  useEffect(() => {
    const style = document.createElement('style');
    style.innerHTML = "* { -webkit-font-smoothing: antialiased; }";
    document.head.appendChild(style);
    return () => style.remove();
  }, []);

  return (
    <div className="relative min-h-screen bg-white overflow-hidden max-w-[1600px] mx-auto">
      {/* Subtle gradient glow in top‑left */}
      <div className="absolute top-0 left-0 w-96 h-96" style={{ background: 'radial-gradient(circle at 30% 30%, #60B1FF, #319AFF)', filter: 'blur(3rem)', opacity: 0.2 }} />

      {/* Strong Liquid Glass NavBar */}
      <nav className="sticky top-[30px] left-1/2 -translate-x-1/2 w-fit bg-white/30 backdrop-blur-[50px] rounded-[16px] border border-[rgba(0,0,0,0.1)] shadow-[inset_0_4px_4px_0_rgba(255,255,255,0.25)] px-4 py-2 flex items-center gap-6 z-10">
        <Logo size="md" variant="default" className="font-bold" />
        <ul className="flex gap-4 text-sm font-medium">
          <li className="hover:text-primary"><a href="#dashboard">Dashboard</a></li>
          <li className="hover:text-primary"><a href="#ai-companion">AI Companion</a></li>
          <li className="hover:text-primary"><a href="#habit-analytics">Habit Analytics</a></li>
          <li className="hover:text-primary"><a href="#settings">Settings</a></li>
        </ul>
        <Button className="flex items-center gap-1 bg-[rgba(0,132,255,0.8)] text-white backdrop-blur-[2px] rounded-[16px] shadow-[inset_0_4px_4px_0_rgba(255,255,255,0.35)] hover:scale-105 transition-transform">
          Check In <ArrowRight className="w-4 h-4" />
        </Button>
      </nav>

      {/* Main hero layout */}
      <div className="relative z-10 flex flex-col md:flex-row items-center justify-between max-w-6xl mx-auto px-6 py-12 gap-12">
        {/* Left column – content */}
        <div className="flex-1 space-y-6">
          {/* Social proof pill */}
          <div className="inline-flex items-center gap-2 bg-yellow-100 text-yellow-800 text-sm px-3 py-1 rounded-full max-w-max">
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927C9.567 1.769 10.433 1.769 10.951 2.927l1.17 2.86a1 1 0 00.95.69h3.005c1.26 0 1.79 1.606.866 2.354l-2.44 1.782a1 1 0 00-.364 1.118l1.169 2.86c.518 1.159-.423 2.265-1.606 1.846l-3.005-.998a1 1 0 00-.787 0l-3.005.998c-1.183.419-2.124-.687-1.606-1.846l1.169-2.86a1 1 0 00-.364-1.118L2.09 9.83c-.924-.748-.394-2.354.866-2.354h3.005a1 1 0 00.95-.69l1.17-2.86z"/></svg>
            AI-Powered Wellness & Productivity
          </div>
          {/* Headline */}
          <h1 className="font-bold" style={{ fontFamily: 'Fustat', fontSize: '75px', lineHeight: 1.05, letterSpacing: '-2px' }}>
            Mind your day, master your goals.
          </h1>
          {/* Subheadline */}
          <p className="text-lg text-gray-700" style={{ fontFamily: 'Inter', letterSpacing: '-1px' }}>
            A single, intelligent hub that bridges emotional well‑being with daily execution. Track your mood with adaptive AI, optimize your tasks, and build unbreakable habits effortlessly.
          </p>
          {/* Primary CTA */}
          <Button onClick={handleEnterApp} disabled={isEntering}
            className="bg-[rgba(0,132,255,0.8)] text-white rounded-[16px] px-6 py-3 flex items-center gap-2 hover:scale-105 transition-transform"
          >
            Start Chat / Connect <ArrowRight className="w-4 h-4" />
          </Button>
        </div>

        {/* Right column – glassy orb */}
        <div className="flex-1 flex justify-center items-center">
          <video
            id="glass-orb"
            autoPlay
            loop
            muted
            playsInline
            className="w-full max-w-md mix-blend-screen"
            style={{ filter: 'hue-rotate(-55deg) saturate(250%) brightness(1.2) contrast(1.1)' }}
          >
            <source src="https://future.co/images/homepage/glassy-orb/orb-purple.webm" type="video/webm" />
          </video>
        </div>
      </div>

      {/* Integrated Framework footer */}
      <footer className="flex justify-center gap-[100px] py-8 border-t border-border text-sm text-gray-600">
        <div className="text-center">Gemini API Real‑time Diagnostics</div>
        <div className="text-center">Web Push Notification Protocol</div>
        <div className="text-center">Biometric Mood Mapping</div>
        <div className="text-center">Smart Task Prioritization Matrix</div>
      </footer>
    </div>
  );
}
