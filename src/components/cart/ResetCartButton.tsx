'use client'
import React, { useState } from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { useAppDispatch } from "@/lib/redux/store";
import { clearCart } from "@/lib/redux/features/shoes/shoesSlice";
import { toast } from "../hooks/use-toast";
import { Trash } from "lucide-react";
import { Loader2 } from "lucide-react";

export const ResetCartButton = () => {
    const dispatch = useAppDispatch()
    const [loading, setLoading] = useState(false)
    const ResetHandler = async()=>{
      try {
        setLoading(true)
        await dispatch(clearCart())
        
        toast({
          title: "Cart Cleared Successfully",
          duration: 1000
        })
      } catch (error) {
        toast({
          variant: 'destructive',
          title: "Error clearing cart",
          description: error as string,
          duration: 2000,
        })
      } finally{
        setLoading(false)
      }
    }

  return (
    <div>
      <AlertDialog>
        <AlertDialogTrigger
          className={
            "bg-destructive text-destructive-foreground rounded-lg p-3 flex space-x-2 w-[200px] justify-center items-center"
          }
        >
          {loading ? (
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          ) : (
            <Trash />
          )}
          {loading ? "Reseting..." : "Reset Cart"}
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete your
              cart data from our servers.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={ResetHandler} className="border-destructive bg-accent text-accent-foreground">
              {loading ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                <Trash />
              )}
              {loading ? "Deleting..." : "Continue"}
              
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};
