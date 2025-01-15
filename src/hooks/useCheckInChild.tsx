import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Child } from "../types/api";
import { checkInChild } from "../api/mutateChild";

export const useCheckInChild = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => await checkInChild(id),
    // when onMutate is called
    onMutate: async (id: string) => {
      // cancel any outdated data, so they don't overwrite the optimistic update
      await queryClient.cancelQueries({ queryKey: ["children"] });
      // save a snapshot of the previous value
      const previousChildren = queryClient.getQueryData(["children"]);
      // optimistically update to the new value
      queryClient.setQueryData<Child[]>(["children"], (previous) => {
        return previous?.map((child) => {
          if (child.childId === id) {
            return {
              ...child,
              checkedIn: true,
            };
          }
          return child;
        });
      });
      // return a context object with the snapshoted value
      return { previousChildren };
    },
    // always refetch after error or success
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["children"] });
    },
    //if the mutation fails, use the context returned from onMutate to roll back
    onError: (_: Error, __: string, context) => {
      queryClient.setQueryData(["children"], context?.previousChildren);
    },
  });
};
