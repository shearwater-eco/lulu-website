import luluMascotThumbsUp from "@/assets/lulu-mascot-thumbs-up.png";

const MeetLulu = () => {
  return (
    <section className="py-10 lg:py-14">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto relative">
          
          {/* Decorative colour blobs */}
          <div className="absolute -top-6 -left-6 w-24 h-24 rounded-full opacity-10"
            style={{ background: 'hsl(var(--tile-yellow))' }}
          />
          <div className="absolute -bottom-4 -right-4 w-20 h-20 rounded-full opacity-10"
            style={{ background: 'hsl(var(--tile-teal))' }}
          />

          <div className="flex flex-col md:flex-row items-center gap-6 md:gap-10 relative">
            
            {/* Lulu — BIG, character-led */}
            <div className="relative flex-shrink-0">
              <div className="animate-wiggle">
                <img 
                  src={luluMascotThumbsUp} 
                  alt="Lulu the mascot"
                  className="w-36 h-36 lg:w-48 lg:h-48 object-contain drop-shadow-lg"
                  loading="lazy"
                  width={192}
                  height={192}
                />
              </div>
              {/* Character name badge */}
              <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 bg-tile-teal text-white px-4 py-1 rounded-full border-2 border-black text-xs font-bold lulu-title shadow-md">
                LULU
              </div>
            </div>

            {/* Copy — playful, character voice */}
            <div className="text-center md:text-left space-y-4 flex-1">
              <h2 className="lulu-title text-3xl lg:text-5xl leading-tight">
                Meet Lulu
              </h2>
              
              {/* Speech bubble style */}
              <div className="relative bg-white border-2 border-black rounded-2xl p-4 shadow-md">
                <p className="text-lg lg:text-xl text-foreground lulu-subtitle leading-relaxed">
                  "I keep it simple. Good loo roll, great value, no nonsense."
                </p>
                {/* Bubble tail on desktop */}
                <div className="hidden md:block absolute -left-3 top-6 w-4 h-4 bg-white border-l-2 border-b-2 border-black transform rotate-45" />
              </div>
              
              <div className="flex flex-wrap gap-2 justify-center md:justify-start">
                {["Fun 🎉", "Lovable 💛", "Smart saver 🧠"].map((tag) => (
                  <span key={tag} className="px-3 py-1.5 rounded-lg border-2 border-black text-xs font-bold lulu-title"
                    style={{ backgroundColor: 'hsl(var(--tile-yellow) / 0.2)' }}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MeetLulu;
