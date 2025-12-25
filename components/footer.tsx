import { type Locale, type Dictionary } from "@/lib/i18n/dictionaries";
import TopologicalPattern from "./topological-pattern";
interface FooterProps {
  lang: Locale;
  dictionary: Dictionary;
}

export default function StickyFooter({ lang, dictionary }: FooterProps) {
  const { footer, common } = dictionary;

  return (
    <footer className="sticky z-0 bottom-0 left-0 w-full bg-indigo-500 ">
      {/* The "Unique Shape" SVG Mask/Background */}
      <div className="absolute bottom-0 left-0 w-full pointer-events-none">
        <svg
          viewBox="0 0 1440 60"
          className="w-full h-full fill-muted"
          preserveAspectRatio="none"
        >
          <path d="M0 60 L0 40 C 40 40, 80 0, 160 0 L 560 0 C 620 0, 640 40, 720 40 C 800 40, 820 0, 880 0 L 1280 0 C 1360 0, 1400 40, 1440 40 L 1440 60 Z" />
        </svg>
      </div>

      {/* Main Footer Body */}
      <div className="relative overflow-hidden pt-8">
        <TopologicalPattern />

        <div className="max-w-7xl mx-auto px-6 relative z-10">
          {/* Top Heading Content */}
          <div className="flex flex-col items-center justify-center text-center mb-16 pt-12">
            <div className="relative mb-8">
              {/* Signature Placeholder */}
              <div className="absolute -top-16 left-1/2 -translate-x-1/2 opacity-80">
                <svg width="150" height="80" viewBox="0 0 150 80" className="stroke-primary fill-none">
                  <path d="M10,40 Q40,10 70,40 T130,40" strokeWidth="3" strokeLinecap="round" />
                  <text x="135" y="45" fill="currentColor" className="text-white text-xl italic font-black">4</text>
                </svg>
              </div>
              <h2 className="text-4xl md:text-7xl font-black italic tracking-tighter leading-tight uppercase">
                ALWAYS <span className="text-white">BRINGING</span><br />
                THE <span className="text-transparent" style={{ WebkitTextStroke: '1px hsl(var(--foreground))' }}>FIGHT.</span>
              </h2>
            </div>

            {/* Centered Image (Helmet Placeholder) */}
            <div className="relative w-48 h-48 md:w-64 md:h-64 group">
              <div className="absolute inset-0 bg-primary blur-3xl opacity-10 group-hover:opacity-20 transition-opacity rounded-full"></div>
              <img
                src="https://picsum.photos/seed/race/400/400"
                alt="Helmet"
                className="relative w-full h-full object-cover rounded-full border-4 border-primary shadow-[0_0_30px_rgba(204,255,0,0.15)]"
              />
              <button className="absolute left-1/2 -translate-x-1/2 bg-primary text-white-foreground px-6 py-2 font-black italic text-sm uppercase tracking-wider hover:scale-105 transition-transform rounded-sm">
                Business Enquiries
              </button>
            </div>
          </div>

          {/* Navigation Grid */}
          <div className="grid grid-cols-2 md:grid-cols-2 gap-8 mb-20 text-center md:text-left">
            <div className="flex flex-col space-y-4">
              <span className="text-xs font-bold text-muted-foreground uppercase tracking-widest mb-2">Pages</span>
              <ul className="space-y-2 text-2xl md:text-3xl font-black italic uppercase">
                <li className="hover:text-white transition-colors cursor-pointer">Home</li>
                <li className="hover:text-white transition-colors cursor-pointer">On Track</li>
                <li className="hover:text-white transition-colors cursor-pointer">Off Track</li>
                <li className="hover:text-white transition-colors cursor-pointer">Calendar</li>
              </ul>
            </div>
            <div className="flex flex-col items-end space-y-4">
              <span className="text-xs font-bold text-muted-foreground uppercase tracking-widest mb-2">Follow On</span>
              <ul className="space-y-2 text-2xl md:text-3xl font-black italic uppercase text-right">
                <li className="hover:text-white transition-colors cursor-pointer">Tiktok</li>
                <li className="hover:text-white transition-colors cursor-pointer">Instagram</li>
                <li className="hover:text-white transition-colors cursor-pointer">Youtube</li>
                <li className="hover:text-white transition-colors cursor-pointer">Twitch</li>
              </ul>
            </div>
          </div>

          {/* Partner Bar */}
          <div className="border-t border-border pt-10 pb-20 flex flex-wrap justify-center items-center gap-12 opacity-60 hover:opacity-100 transition-opacity">
            <span className="text-lg font-bold italic tracking-tighter">McLaren</span>
            <span className="text-lg font-bold tracking-widest uppercase">Uber</span>
            <span className="text-lg font-black border-2 border-foreground px-2 italic">L4</span>
            <span className="text-lg font-bold">QUADRANT</span>
            <span className="text-lg font-serif">Ralph Lauren</span>
            <span className="text-lg font-black text-white">Android</span>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="bg-black text-white-foreground py-4 px-6 flex flex-col md:flex-row justify-between items-center text-[10px] font-black uppercase tracking-widest">
          &copy; {new Date().getFullYear()} Dama Productions All rights reserved.
          <div className="flex space-x-8">
            <a href="#" className="hover:underline">Privacy Policy</a>
            <a href="#" className="hover:underline">Terms & Conditions</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
