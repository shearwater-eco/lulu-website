import { Link } from "react-router-dom";

const SecondaryProduct = () => {
  return (
    <section className="py-4">
      <div className="container mx-auto px-4">
        <div className="max-w-md mx-auto text-center py-6 px-8 rounded-xl border-2 border-black border-dashed"
          style={{ borderColor: 'hsl(var(--tile-pink) / 0.5)' }}
        >
          <p className="text-muted-foreground lulu-subtitle text-lg mb-3">
            Need more? <span className="font-bold text-foreground">48 Rolls</span> available
          </p>
          <Link to="/shop">
            <button className="btn-lulu-secondary text-sm px-6 py-2.5 hover:animate-bounce-hover">
              View Option
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default SecondaryProduct;
