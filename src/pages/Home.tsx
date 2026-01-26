import { StoreLayout } from '@/components/storefront/StoreLayout';
import { SideRainbowStrips } from '@/components/storefront/RainbowBorder';
import { HeroSection } from '@/components/storefront/sections/HeroSection';
import { ProductRangeSection } from '@/components/storefront/sections/ProductRangeSection';
import { CertificationsSection } from '@/components/storefront/sections/CertificationsSection';
import { WhyChooseSection } from '@/components/storefront/sections/WhyChooseSection';
import { TestimonialsSection } from '@/components/storefront/sections/TestimonialsSection';
import { CTASection } from '@/components/storefront/sections/CTASection';

export default function Home() {
  return (
    <StoreLayout>
      {/* Side rainbow strips - EXACT lulu.earth effect */}
      <SideRainbowStrips />

      {/* Main content with padding for side strips */}
      <div className="lg:ml-8 lg:mr-8">
        {/* Hero Section */}
        <HeroSection />

        {/* Product Range Section */}
        <ProductRangeSection />

        {/* Certifications Section */}
        <CertificationsSection />

        {/* Why Choose LULU Section */}
        <WhyChooseSection />

        {/* Testimonials Section */}
        <TestimonialsSection />

        {/* CTA Section */}
        <CTASection />
      </div>
    </StoreLayout>
  );
}
