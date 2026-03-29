import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { MosaicFrame, MosaicArch, MosaicStrip } from '@/components/storefront/StainedGlassMosaic';
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

      {/* Box front face — mosaic frame with handle arch */}
      <MosaicFrame showArch borderWidth={24} className="mx-auto max-w-3xl">
        <CurvedPanel>
          <div className="text-center space-y-5">
            {/* Product descriptor */}
            <p className="text-base md:text-lg font-serif italic text-muted-foreground tracking-wide">
              TOILET TISSUE by
            </p>

            {/* LULU brand name — dominant */}
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold font-serif tracking-tight leading-none">
              LULU
            </h1>

            {/* VAL-U-SMART seal */}
            <div className="flex justify-center">
              <div className="relative w-28 h-28 md:w-36 md:h-36 rounded-full border-[3px] border-primary bg-primary/5 flex flex-col items-center justify-center">
                <span className="text-[10px] md:text-xs font-bold tracking-widest uppercase text-primary">
                  VAL-U-SMART
                </span>
                <span className="text-2xl md:text-3xl font-bold text-foreground leading-none mt-1">
                  24
                </span>
                <span className="text-[10px] md:text-xs font-bold uppercase text-primary tracking-wider">
                  ROLLS
                </span>
                {/* Feather accent */}
                <span className="absolute -top-2 -right-2 text-lg">🪶</span>
              </div>
            </div>

            {/* Tagline */}
            <p className="text-sm md:text-base font-serif italic text-muted-foreground">
              gentle on you, kind to the earth
            </p>

            {/* SHOP NOW CTA */}
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
