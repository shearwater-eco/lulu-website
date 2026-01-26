import { Leaf, TreePine, Recycle, Droplets } from 'lucide-react';
import { RainbowBorder } from '../RainbowBorder';

interface Certification {
  icon: React.ReactNode;
  title: string;
  subtitle: string;
  color: 'green' | 'orange' | 'yellow' | 'blue';
}

const certifications: Certification[] = [
  {
    icon: <Leaf className="h-8 w-8 text-white" />,
    title: 'ECO SMART',
    subtitle: '6 ROLLS',
    color: 'green',
  },
  {
    icon: <TreePine className="h-8 w-8 text-white" />,
    title: 'FSC',
    subtitle: 'Certified sustainable',
    color: 'orange',
  },
  {
    icon: <Recycle className="h-8 w-8 text-foreground" />,
    title: '100%',
    subtitle: 'Recyclable',
    color: 'yellow',
  },
  {
    icon: <Droplets className="h-8 w-8 text-white" />,
    title: 'PLASTIC',
    subtitle: 'FREE',
    color: 'blue',
  },
];

const colorMap = {
  green: 'bg-[#4ADE80]',
  orange: 'bg-[#FF8B4D]',
  yellow: 'bg-[#FFE23E]',
  blue: 'bg-[#3EC9FF]',
};

export function CertificationsSection() {
  return (
    <section className="py-20 md:py-28">
      <div className="container">
        {/* Section header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold font-serif tracking-wide">
            TRUSTED BY NATURE, LOVED BY YOU
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground mt-4 font-serif italic">
            Our eco-certifications speak for themselves
          </p>
        </div>

        {/* Certification cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {certifications.map((cert) => (
            <RainbowBorder key={cert.title}>
              <div className="p-6 md:p-8 text-center space-y-4">
                {/* Icon circle */}
                <div 
                  className={`w-16 h-16 rounded-full mx-auto flex items-center justify-center ${colorMap[cert.color]}`}
                >
                  {cert.icon}
                </div>

                {/* Title */}
                <h3 className="text-lg md:text-xl font-bold font-serif">
                  {cert.title}
                </h3>

                {/* Subtitle */}
                <p className="text-sm text-muted-foreground">
                  {cert.subtitle}
                </p>
              </div>
            </RainbowBorder>
          ))}
        </div>
      </div>
    </section>
  );
}
