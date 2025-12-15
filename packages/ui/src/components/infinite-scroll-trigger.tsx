import React, { forwardRef } from "react";
import { Button } from "@workspace/ui/components/button";
import { cn } from "@workspace/ui/lib/utils";

interface InfiniteScrollTriggerProps {
  canLoadMore: boolean;
  isLoadingMore: boolean;
  onLoadMore: () => void;
  loadMoreText?: string;
  noMoreText?: string;
  className?: string;
}

export const InfiniteScrollTrigger = forwardRef<HTMLDivElement, InfiniteScrollTriggerProps>(
  (
    {
      canLoadMore,
      isLoadingMore,
      onLoadMore,
      loadMoreText = "Load more",
      noMoreText = "No more items",
      className,
    },
    ref
  ) => {
    const text = isLoadingMore ? "Loading..." : !canLoadMore ? noMoreText : loadMoreText;

    return (
      <div className={cn("flex w-full justify-center py-2", className)} ref={ref}>
        <Button
          disabled={!canLoadMore || isLoadingMore}
          onClick={onLoadMore}
          size="sm"
          variant="ghost"
        >
          {text}
        </Button>
      </div>
    );
  }
);

export default InfiniteScrollTrigger;
