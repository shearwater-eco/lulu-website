import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { MosaicFrame, MosaicStrip } from '@/components/storefront/StainedGlassMosaic';
import { CurvedPanel } from '@/components/storefront/CurvedPanel';

export function BoxFrontSection() {
  return (
    <section className="relative">
      {/* THE BEST TP IN THE UNIVERSE — bold marketing banner */}
      <div className="py-6 md:py-10 text-center">
        <h2
          className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold font-serif tracking-widest uppercase"
          style={{ letterSpacing: '0.15em' }}
        >
          THE BEST TP IN THE UNIVERSE
        </h2>
      </div>

      {/* Mosaic strip divider */}
      <MosaicStrip className="mb-0" seed={11} />

      {/* Box front face — mosaic frame with content */}
      <MosaicFrame borderWidth={28} className="mx-auto max-w-2xl md:max-w-3xl">
        <CurvedPanel>
          <div className="text-center space-y-4 md:space-y-6">
            {/* TOILET TISSUE — curved across the top, serif italic like the box */}
            <div>
              <h3
                className="text-2xl sm:text-3xl md:text-4xl font-serif italic tracking-wide text-foreground"
                style={{ fontWeight: 400 }}
              >
                TOILET TISSUE
              </h3>
              <p className="text-lg md:text-xl font-serif italic text-muted-foreground mt-1">
                by
              </p>
            </div>

            {/* LULU brand name — large, bold serif, dominant */}
            <h1 className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-bold font-serif tracking-tight leading-none text-foreground">
              LULU
            </h1>

            {/* VAL-U-SMART seal — matching the teal circle from the box */}
            <div className="flex justify-center py-2">
              <div className="relative w-32 h-32 md:w-40 md:h-40 rounded-full border-[4px] border-primary bg-primary/5 flex flex-col items-center justify-center">
                {/* VAL-U-SMART text around the top */}
                <span
                  className="text-[9px] md:text-[11px] font-bold tracking-[0.25em] uppercase text-primary"
                  style={{ letterSpacing: '0.25em' }}
                >
                  VAL-U-SMART
                </span>

                {/* 24 ROLLS */}
                <span className="text-3xl md:text-4xl font-bold text-foreground leading-none mt-1">
                  24
                </span>
                <span className="text-xs md:text-sm font-bold uppercase text-foreground tracking-wider">
                  ROLLS
                </span>

                {/* Feather icon */}
                <span className="text-xl md:text-2xl mt-1 opacity-60">🪶</span>
              </div>
            </div>

            {/* Tagline — italic serif, matching the box */}
            <p className="text-base md:text-lg lg:text-xl font-serif italic text-muted-foreground">
              gentle on you, kind to the earth
            </p>

            {/* SHOP NOW CTA */}
            <div className="pt-2">
              <Button
                size="lg"
                asChild
                className="rounded-xl border-2 border-foreground bg-primary text-primary-foreground text-lg font-bold px-10 py-7 shadow-brutal hover:shadow-brutal-lg transition-all hover:-translate-y-0.5"
              >
                <Link to="/shop">
                  SHOP NOW
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            </div>
          </div>
        </CurvedPanel>
      </MosaicFrame>

      {/* Mosaic strip divider */}
      <MosaicStrip className="mt-0" seed={13} />

      {/* Video below the box front */}
      <div className="max-w-4xl mx-auto mt-8 md:mt-12 rounded-lg overflow-hidden border-2 border-foreground/10">
        <video
          src="/lulu-video-website-2.mp4"
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-auto"
        />
      </div>
    </section>
  );
}
