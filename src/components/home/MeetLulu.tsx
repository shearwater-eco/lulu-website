import luluMascotThumbsUp from "@/assets/lulu-mascot-thumbs-up.png";

const MeetLulu = () => {
  return (
    <section className="py-10">
      <div className="container mx-auto px-4">
        <div className="max-w-xl mx-auto flex flex-col md:flex-row items-center gap-6 md:gap-8">
          
          {/* Lulu with subtle animation */}
          <div className="flex-shrink-0 animate-wiggle">
            <img 
              src={luluMascotThumbsUp} 
              alt="Lulu the mascot"
              className="w-32 h-32 lg:w-40 lg:h-40 object-contain drop-shadow-md"
              loading="lazy"
              width={160}
              height={160}
            />
          </div>

          <div className="text-center md:text-left space-y-3">
            <h2 className="lulu-title text-3xl lg:text-4xl">Meet Lulu</h2>
            <p className="text-lg text-muted-foreground lulu-subtitle leading-relaxed">
              She keeps it simple. Good value. No nonsense.
            </p>
            <p className="text-foreground font-bold lulu-title text-sm inline-block px-4 py-2 rounded-lg border-2 border-black"
              style={{ backgroundColor: 'hsl(var(--tile-yellow) / 0.2)' }}
            >
              Fun, lovable, and here to save you money 💛
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MeetLulu;
