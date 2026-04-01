

## Move P.L.U. alien further right and scale down to 0.5×

### Changes — `src/components/home/HeroSection.tsx`

1. **Position further right**: Change `right-[5%] lg:right-[10%]` → `right-[-5%] lg:right-[2%]` to push it closer to the right edge.

2. **Scale down to half size**: Change image classes from `w-84 lg:w-[480px]` → `w-[168px] lg:w-[240px]` (halving current dimensions). Update `width`/`height` attributes accordingly.

