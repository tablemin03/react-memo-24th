import { useEffect, useRef, useState } from "react";
import PlusIcon from "../components/icons/PlusIcon";
import SearchIcon from "../components/icons/SearchIcon";
import PeopleIcon from "../components/icons/PeopleIcon";
import type { Memo, MemoTag } from "../types/memos";
import MemoLists from "../components/MemoLists";
import MemoListSkeleton from "../components/skeletons/MemoListSkeleton";
import MemoModal from "../components/MemoModal";
import Select from "../components/Select";
import { TAG_OPTIONS } from "../constants/tags";
import { useInfiniteMemos } from "../hooks/queries/useInfiniteMemos";

export default function MainPage() {
  const {
    memos,
    totalElements,
    fetchNextPage,
    hasNextPage,
    isPending,
    isFetching,
    isFetchingNextPage,
    isError,
  } = useInfiniteMemos();
  const loadMoreRef = useRef<HTMLDivElement>(null);

  const [pinnedOverrides, setPinnedOverrides] = useState<
    Record<number, boolean>
  >({});

  const [keyword, setKeyword] = useState("");
  const [debouncedKeyword, setDebouncedKeyword] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<MemoTag | "">("");
  const [selectedMemoId, setSelectedMemoId] = useState<Memo["id"] | null>(null);

  const displayedMemos = memos.map((memo) => ({
    ...memo,
    isPinned: pinnedOverrides[memo.id] ?? memo.isPinned,
  }));
  const selectedMemo = displayedMemos.find(
    (memo) => memo.id === selectedMemoId,
  );

  useEffect(() => {
    const target = loadMoreRef.current;
    if (!target || !hasNextPage || isFetching || isError) return;

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        void fetchNextPage({ cancelRefetch: false });
      }
    });

    observer.observe(target);

    return () => observer.disconnect();
  }, [fetchNextPage, hasNextPage, isFetching, isError]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedKeyword(keyword);
    }, 300);

    return () => clearTimeout(timer);
  }, [keyword]);

  const query = debouncedKeyword.trim().toLowerCase();

  const togglePinned = (id: Memo["id"]) => {
    const memo = memos.find((memo) => memo.id === id);
    if (!memo) return;

    setPinnedOverrides((previous) => ({
      ...previous,
      [id]: !(previous[id] ?? memo.isPinned),
    }));
  };

  const filteredMemos = displayedMemos.filter((memo) => {
    const matchesCategory =
      selectedCategory === "" || memo.category === selectedCategory;

    const matchesKeyword =
      memo.title.toLowerCase().includes(query) ||
      memo.content.toLowerCase().includes(query);

    return matchesCategory && matchesKeyword;
  });

  return (
    <div className="flex flex-col w-screen min-h-dvh p-30 pt-18 pb-21.5 bg-blue01">
      <div className="flex w-full min-w-130 max-w-300 items-center gap-2.5">
        <form
          className="flex min-w-0 flex-1"
          onSubmit={(event) => event.preventDefault()}
        >
          <div className="flex w-full items-center p-4 gap-2.5 rounded-[28px] bg-white00">
            <div className="shrink-0">
              <span aria-hidden="true"></span>
              <Select
                aria-label="검색 태그"
                options={[{ value: "", label: "태그 선택" }, ...TAG_OPTIONS]}
                value={selectedCategory}
                onValueChange={(value) => {
                  if (
                    value === "" ||
                    value === "WORK" ||
                    value === "DAILY" ||
                    value === "OTHER"
                  ) {
                    setSelectedCategory(value);
                  }
                }}
              />
            </div>
            <input
              className="min-w-0 flex-1 text-field-medium"
              type="text"
              aria-label="메모 검색"
              placeholder="원하는 메모를 검색하세요"
              value={keyword}
              onChange={(event) => setKeyword(event.target.value)}
            />
            <button type="submit" aria-label="검색" className="shrink-0">
              <SearchIcon className="text-blue07" />
            </button>
          </div>
        </form>
        <button
          type="button"
          aria-label="새로운 메모 작성"
          className="shrink-0 p-4 bg-white00 rounded-[40px] cursor-pointer"
        >
          <PlusIcon className="text-blue07" />
        </button>
        <button
          type="button"
          aria-label="마이페이지"
          className="shrink-0 p-4 bg-white00 rounded-[40px] cursor-pointer"
        >
          <PeopleIcon className="text-blue07" />
        </button>
      </div>

      {isPending ? (
        <MemoListSkeleton />
      ) : (
        (!isError || memos.length > 0) && (
          <MemoLists
            memos={filteredMemos}
            totalCount={totalElements}
            onTogglePinned={togglePinned}
            onSelectMemo={setSelectedMemoId}
          />
        )
      )}
      {isFetchingNextPage && <MemoListSkeleton className="mt-4" />}
      <div
        ref={loadMoreRef}
        aria-hidden="true"
        className="h-px w-full shrink-0"
      />

      {selectedMemo && (
        <MemoModal
          memo={selectedMemo}
          onClose={() => setSelectedMemoId(null)}
        />
      )}
    </div>
  );
}
