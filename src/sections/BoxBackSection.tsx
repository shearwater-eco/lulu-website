import { MosaicFrame, MosaicStrip } from '@/components/storefront/StainedGlassMosaic';
import { CurvedPanel } from '@/components/storefront/CurvedPanel';
import luluMascot from '@/assets/lulu-mascot-thumbs-up-new.png';
import badgeTreeFree from '@/assets/badge-tree-free.png';
import badgeLowerCarbon from '@/assets/badge-lower-carbon.png';
import badgeDignity from '@/assets/badge-dignity.png';

export function BoxBackSection() {
  return (
    <section className="relative mt-16 md:mt-24">
      {/* Mosaic strip top */}
      <MosaicStrip className="mb-0" seed={21} />

      {/* Box back face */}
      <MosaicFrame borderWidth={24} className="mx-auto max-w-3xl">
        <CurvedPanel>
          <div className="text-center space-y-6">
            {/* Website URL header */}
            <p className="text-sm md:text-base font-bold tracking-[0.3em] uppercase text-primary">
              WWW.LULU.EARTH
            </p>

            {/* Mascot */}
            <div className="flex justify-center">
              <img
                src={luluMascot}
                alt="Lulu the puffin mascot giving a thumbs up"
                className="w-32 h-32 md:w-40 md:h-40 object-contain"
              />
            </div>

            {/* Brand poem */}
            <div className="space-y-2 max-w-sm mx-auto">
              <p className="font-serif italic text-sm md:text-base text-muted-foreground leading-relaxed">
                "Hello! I'm Lulu the Puffin,
                <br />
                and I love our beautiful planet.
                <br />
                That's why I've made sure our
                <br />
                tissue is tree-free, plastic-free,
                <br />
                and kind to the Earth.
                <br />
                Soft, strong, and sustainable —
                <br />
                just the way it should be."
              </p>
            </div>

            {/* Certification badges */}
            <div className="flex justify-center items-center gap-4 md:gap-6 pt-2">
              <img
                src={badgeTreeFree}
                alt="Tree-Free certified"
                className="w-16 h-16 md:w-20 md:h-20 object-contain"
              />
              <img
                src={badgeLowerCarbon}
                alt="Lower Carbon footprint"
                className="w-16 h-16 md:w-20 md:h-20 object-contain"
              />
              <img
                src={badgeDignity}
                alt="Dignity for People and Planet"
                className="w-16 h-16 md:w-20 md:h-20 object-contain"
              />
            </div>

            {/* Brand attribution */}
            <p className="text-xs text-muted-foreground tracking-widest uppercase pt-2">
              LULU by ShearWater Eco ™
            </p>
          </div>
        </CurvedPanel>
      </MosaicFrame>

      {/* Mosaic strip bottom */}
      <MosaicStrip className="mt-0" seed={23} />
    </section>
  );
}
