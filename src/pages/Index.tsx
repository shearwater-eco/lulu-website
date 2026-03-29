import { SideMosaicStrips } from '@/components/storefront/StainedGlassMosaic';
import { BoxFrontSection } from '@/sections/BoxFrontSection';
import { BoxBackSection } from '@/sections/BoxBackSection';
import { ProductRangeSection } from '@/sections/ProductRangeSection';
import { TestimonialsSection } from '@/sections/TestimonialsSection';
import { CTASection } from '@/sections/CTASection';

const Index = () => {
  return (
    <div>
      <SideMosaicStrips />
      <div className="lg:ml-8 lg:mr-8">
        <BoxFrontSection />
        <BoxBackSection />
        <ProductRangeSection />
        <TestimonialsSection />
        <CTASection />
      </div>
    </div>
  );
};

export default Index;
