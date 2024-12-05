import { PropertyCardSkeleton } from './property-card.skeleton';

export function PropertyListSkeleton({ count = 10 }: { count?: number }) {
  return (
    <>
      {Array.from({ length: count }).map((_, index) => (
        <PropertyCardSkeleton key={index} />
      ))}
    </>
  );
}
