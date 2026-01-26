import badgeDignity from '@/assets/badge-dignity.png';
import badgeLowerCarbon from '@/assets/badge-lower-carbon.png';
import badgeTreeFree from '@/assets/badge-tree-free.png';

export function CertificationsSection() {
  const certifications = [
    {
      name: 'Tree Free',
      description: 'Made from 100% recycled materials',
      image: badgeTreeFree,
    },
    {
      name: 'Lower Carbon',
      description: 'Reduced carbon footprint production',
      image: badgeLowerCarbon,
    },
    {
      name: 'Dignity',
      description: 'Ethical and fair production practices',
      image: badgeDignity,
    },
  ];

  return (
    <section className="py-16 md:py-24 bg-muted/50">
      <div className="container">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold font-serif mb-4">
            Our Certifications
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            We're committed to sustainability and ethical practices at every step.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {certifications.map((cert) => (
            <div
              key={cert.name}
              className="text-center p-6 rounded-lg bg-background"
            >
              <img
                src={cert.image}
                alt={cert.name}
                className="w-24 h-24 mx-auto mb-4 object-contain"
              />
              <h3 className="text-lg font-bold mb-2">{cert.name}</h3>
              <p className="text-muted-foreground text-sm">{cert.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
