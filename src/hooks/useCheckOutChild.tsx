import { useMutation, useQueryClient } from "@tanstack/react-query";
import { checkOutChild } from "../api/mutateChild";
import type { Child } from "../types/api";

export const useCheckOutChild = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => checkOutChild(id),
    onMutate: async (id: string) => {
      await queryClient.cancelQueries({ queryKey: ["children"] });
      const previousChildren = queryClient.getQueryData(["children"]);
      queryClient.setQueryData<Child[]>(["children"], (previous) => {
        return previous?.map((child) => {
          if (child.childId === id) {
            return {
              ...child,
              checkIn: false,
            };
          }
          return child;
        });
      });
      return { previousChildren };
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["children"] });
    },
    onError: (error: Error, id: string) => {
      console.log(`Failed to check out child with id ${id}:`, error.message);
    },
  });
};
