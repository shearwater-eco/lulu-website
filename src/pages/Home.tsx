import { StoreLayout } from '@/components/storefront/StoreLayout';
import { SideMosaicStrips } from '@/components/storefront/StainedGlassMosaic';
import { BoxFrontSection } from '@/sections/BoxFrontSection';
import { BoxBackSection } from '@/sections/BoxBackSection';
import { ProductRangeSection } from '@/sections/ProductRangeSection';
import { TestimonialsSection } from '@/sections/TestimonialsSection';
import { CTASection } from '@/sections/CTASection';

export default function Home() {
  return (
    <StoreLayout>
      {/* Side mosaic strips - stained glass effect */}
      <SideMosaicStrips />

      {/* Main content with padding for side strips */}
      <div className="lg:ml-8 lg:mr-8">
        {/* Box Front Face = Hero */}
        <BoxFrontSection />

        {/* Box Back Face = Story */}
        <BoxBackSection />

        {/* Product Range - ecommerce focused */}
        <ProductRangeSection />

        {/* Testimonials */}
        <TestimonialsSection />

        {/* CTA */}
        <CTASection />
      </div>
    </StoreLayout>
  );
}
