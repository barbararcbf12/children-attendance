import { useQuery } from "@tanstack/react-query";
import { getChildren, QueryProps } from "../api/getChildren";
import type { ChildrenApiResponse } from "../types/api";

export function useGetChildren(query: QueryProps) {
  return useQuery<ChildrenApiResponse>({
    queryKey: ["children", query],
    queryFn: () => getChildren(query),
    retry: 3,
    retryDelay: 5000,
    refetchOnMount: false,
  });
}
