import { API_URL } from "../constants/api";
import type { ChildrenApiResponse } from "../types/api";

export type QueryProps = {
  accessToken: string;
  groupId: string;
  institutionId: string;
};

export const getChildren: (
  query: QueryProps
) => Promise<ChildrenApiResponse> = async (query) => {
  const searchParams = new URLSearchParams();
  if (query) {
    (Object.keys(query) as (keyof QueryProps)[]).forEach((queryKey) => {
      const value = query[queryKey];
      if (value) {
        searchParams.set(queryKey, value.toString());
      }
    });
  }
  try {
    const response = await fetch(
      `${API_URL}daycare/tablet/group?${searchParams}`
    );
    if (!response.ok) throw new Error("Network response was not ok");
    return await response.json();
  } catch (error) {
    console.error("Error fetching children's data:", error);
    return null;
  }
};
