import React from "react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export function ProductCardSkeleton() {
  return (
    <Card className="flex h-full flex-col justify-between overflow-hidden">
      <CardContent className="p-4 flex-grow">
        <Skeleton className="aspect-square w-full rounded-lg" />
        <div className="mt-4 space-y-2">
          <Skeleton className="h-6 w-2/3" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-full" />
          <div className="flex justify-between">
            <Skeleton className="h-6 w-1/4" />
            <Skeleton className="h-4 w-1/4" />
          </div>
          <div className="flex items-center">
            <Skeleton className="h-4 w-24" />
          </div>
        </div>
      </CardContent>
      <CardFooter className="mt-auto p-4">
        <Skeleton className="h-10 w-full" />
      </CardFooter>
    </Card>
  );
}
