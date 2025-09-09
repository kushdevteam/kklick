import { cn } from "@/lib/utils"

function Skeleton({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn("skeleton", className)}
      {...props}
    />
  )
}

interface SkeletonVariantProps {
  className?: string;
}

function SkeletonText({ className }: SkeletonVariantProps) {
  return <Skeleton className={cn("skeleton-text", className)} data-testid="skeleton-text" />;
}

function SkeletonCard({ className }: SkeletonVariantProps) {
  return <Skeleton className={cn("skeleton-card", className)} data-testid="skeleton-card" />;
}

function SkeletonButton({ className }: SkeletonVariantProps) {
  return <Skeleton className={cn("skeleton-button", className)} data-testid="skeleton-button" />;
}

function SkeletonAvatar({ className }: SkeletonVariantProps) {
  return <Skeleton className={cn("skeleton-avatar", className)} data-testid="skeleton-avatar" />;
}

function MarketplaceSkeleton() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4" data-testid="marketplace-skeleton">
      {Array.from({ length: 6 }).map((_, i) => (
        <div key={i} className="space-y-3">
          <SkeletonCard />
          <SkeletonText className="w-3/4" />
          <SkeletonText className="w-1/2" />
          <SkeletonButton />
        </div>
      ))}
    </div>
  );
}

function StakingSkeleton() {
  return (
    <div className="space-y-4 p-4" data-testid="staking-skeleton">
      {Array.from({ length: 5 }).map((_, i) => (
        <div key={i} className="flex items-center space-x-4 p-4 border border-border rounded-lg">
          <SkeletonAvatar />
          <div className="flex-1 space-y-2">
            <SkeletonText className="w-1/3" />
            <SkeletonText className="w-1/2" />
          </div>
          <SkeletonButton />
        </div>
      ))}
    </div>
  );
}

function AchievementsSkeleton() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4" data-testid="achievements-skeleton">
      {Array.from({ length: 8 }).map((_, i) => (
        <div key={i} className="flex items-center space-x-3 p-3 border border-border rounded-lg">
          <SkeletonAvatar className="w-8 h-8" />
          <div className="flex-1 space-y-2">
            <SkeletonText className="w-2/3" />
            <SkeletonText className="w-1/2" />
          </div>
        </div>
      ))}
    </div>
  );
}

export { 
  Skeleton, 
  SkeletonText, 
  SkeletonCard, 
  SkeletonButton, 
  SkeletonAvatar,
  MarketplaceSkeleton,
  StakingSkeleton,
  AchievementsSkeleton
}
