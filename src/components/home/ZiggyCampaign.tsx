import { Link } from "react-router-dom";
import ziggyAlien from "@/assets/ziggy-alien-v4.png";

const ZiggyCampaign = () => {
  return (
    <section className="py-8 lg:py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto relative">
          
          {/* Playful background shape */}
          <div className="absolute inset-0 rounded-3xl transform rotate-[1deg] border-2 border-black opacity-20"
            style={{ background: 'hsl(var(--tile-blue) / 0.1)' }}
          />
          
          <div className="relative flex flex-col md:flex-row items-center gap-6 md:gap-10 p-6 lg:p-8">
            
            {/* Ziggy — big and animated */}
            <div className="relative flex-shrink-0">
              <div className="animate-saucer-hover">
                <div className="animate-saucer-glow">
                  <img 
                    src={ziggyAlien} 
                    alt="Ziggy the alien"
                    className="w-36 h-36 lg:w-52 lg:h-52 object-contain"
                    loading="lazy"
                    width={160}
                    height={160}
                  />
                </div>
              </div>
              {/* Name badge */}
              <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 bg-tile-blue text-white px-4 py-1 rounded-full border-2 border-black text-xs font-bold lulu-title shadow-md">
                ZIGGY
              </div>
            </div>

            {/* Story — character voice */}
            <div className="flex-1 text-center md:text-left space-y-3">
              {/* Speech bubble */}
              <div className="relative bg-white border-2 border-black rounded-2xl p-4 shadow-md">
                <p className="text-lg lg:text-xl text-foreground font-bold lulu-title leading-snug">
                  "Came for the loo. Stayed for the rolls."
                </p>
                <p className="text-sm text-muted-foreground lulu-subtitle mt-1">
                  Even aliens know a good deal when they see one. 🛸
                </p>
                {/* Bubble tail */}
                <div className="hidden md:block absolute -left-3 top-6 w-4 h-4 bg-white border-l-2 border-b-2 border-black transform rotate-45" />
              </div>
              
              <Link to="/about">
                <button className="btn-lulu-primary text-sm px-6 py-3 group">
                  Watch the Ad
                  <span className="ml-1 inline-block transition-transform group-hover:translate-x-1">→</span>
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ZiggyCampaign;
