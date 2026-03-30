import { Link } from "react-router-dom";
import ziggyAlien from "@/assets/ziggy-alien.png";

const ZiggyCampaign = () => {
  return (
    <section className="py-8">
      <div className="container mx-auto px-4">
        <div className="max-w-xl mx-auto flex items-center gap-5 md:gap-8">
          
          {/* Ziggy floating */}
          <div className="flex-shrink-0 animate-saucer-hover">
            <div className="animate-saucer-glow">
              <img 
                src={ziggyAlien} 
                alt="Ziggy the alien"
                className="w-24 h-24 lg:w-32 lg:h-32 object-contain"
                loading="lazy"
                width={128}
                height={128}
              />
            </div>
          </div>

          <div className="flex-1 space-y-2">
            <p className="text-lg lg:text-xl text-foreground font-bold lulu-title leading-snug">
              Ziggy came for the loo. Stayed for the rolls.
            </p>
            <p className="text-sm text-muted-foreground lulu-subtitle">
              Even aliens know a good deal when they see one.
            </p>
            <Link to="/about">
              <button className="btn-lulu-primary text-sm px-5 py-2.5 mt-2 hover:animate-bounce-hover">
                Watch the Ad
              </button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ZiggyCampaign;
