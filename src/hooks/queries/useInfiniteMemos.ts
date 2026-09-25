import { useInfiniteQuery } from "@tanstack/react-query";
import { getMemos } from "../../apis/memos";

export const useInfiniteMemos = (size = 10) => {
  const query = useInfiniteQuery({
    queryKey: ["memos", "infinite", { size }],

    staleTime: 60 * 1000,
    gcTime: 5 * 60 * 1000,

    initialPageParam: 0,
    queryFn: async ({ pageParam }) => {
      const response = await getMemos({ page: pageParam, size });

      return response.data;
    },
    getNextPageParam: (lastPage) =>
      lastPage.last ? undefined : lastPage.page + 1,
  });

  return {
    ...query,
    memos: query.data?.pages.flatMap((page) => page.content) ?? [],
    totalElements: query.data?.pages[0]?.totalElements ?? 0,
  };
};
