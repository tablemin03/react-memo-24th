import type { Memo } from "../types/memos";
import { MEMO_COLORS, TAG_LABELS } from "../constants/tags";
import PlusIcon from "./icons/PlusIcon";
import SearchIcon from "./icons/SearchIcon";
import StarIcon from "./icons/StarIcon";

type MemoListsProps = {
  memos: Memo[];
  totalCount: number;
  onCreateMemo?: () => void;
  onTogglePinned: (id: Memo["id"]) => void;
  onSelectMemo: (id: Memo["id"]) => void;
};

const MemoLists = ({
  memos,
  totalCount,
  onCreateMemo,
  onTogglePinned,
  onSelectMemo,
}: MemoListsProps) => {
  const groups = [
    {
      id: "pinned-memo-list",
      label: "즐겨찾기 메모",
      memos: memos.filter((memo) => memo.isPinned),
    },
    {
      id: "memo-list",
      label: "일반 메모",
      memos: memos.filter((memo) => !memo.isPinned),
    },
  ];
  return (
    <section
      aria-label="메모 목록"
      className={`mt-8 w-full min-w-0 ${
        totalCount === 0 || memos.length === 0 ? "flex flex-1 flex-col" : ""
      }`}
    >
      {totalCount === 0 ? (
        <div className="flex w-full flex-1 flex-col items-center justify-center rounded-[24px] border-2 border-dashed border-blue02">
          <button
            type="button"
            aria-label="새로운 메모 작성"
            className="flex bg-blue02 w-30 h-30 items-center justify-center rounded-[75px] cursor-pointer"
            onClick={onCreateMemo}
          >
            <PlusIcon size={32} className="text-gray01" />
          </button>
          <p className="text-heading-medium text-blue02 mt-5">
            새로운 메모를 작성해보세요!
          </p>
        </div>
      ) : memos.length === 0 ? (
        <div
          className="flex w-full flex-1 flex-col justify-center rounded-[24px] border-2 border-dashed border-blue07 items-center"
          role="status"
        >
          <button className="flex justify-center items-center rounded-[48px] w-24 h-24 bg-blue07 cursor-pointer">
            <SearchIcon className="text-blue01" />
          </button>
          <div className="flex flex-col gap-2 mt-5 items-center justify-center">
            <p className="text-body-small text-blue07">검색 결과가 없습니다</p>
            <p className="text-body-small text-gray03">
              다른 키워드로 검색해보세요
            </p>
          </div>
        </div>
      ) : (
        <div className="flex flex-col gap-4">
          {groups
            .filter((group) => group.memos.length > 0)
            .map((group) => (
              <ul
                key={group.id}
                id={group.id}
                aria-label={group.label}
                className="flex w-[105%] flex-wrap gap-4"
              >
                {group.memos.map((memo) => (
                  <li key={memo.id} className="w-[285px] max-w-full shrink-0">
                    <article
                      className={`relative flex flex-col w-full h-[285px] rounded-2xl text-white00 py-8 px-5 ${MEMO_COLORS[memo.category]}`}
                    >
                      <button
                        type="button"
                        aria-label={`${memo.title} 상세 보기`}
                        className="absolute inset-0 cursor-pointer rounded-2xl focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-blue07"
                        onClick={() => onSelectMemo(memo.id)}
                      />
                      <div className="min-h-0 flex-1 overflow-hidden">
                        <div className="flex justify-between">
                          <h2 className="line-clamp-1 text-heading-small">
                            {memo.title}
                          </h2>
                          <button
                            type="button"
                            className="relative z-10 shrink-0 cursor-pointer"
                            aria-label={`${memo.title} 즐겨찾기`}
                            aria-pressed={!!memo.isPinned}
                            onClick={() => onTogglePinned(memo.id)}
                          >
                            <StarIcon
                              className={
                                memo.isPinned ? "text-point" : "text-gray01"
                              }
                            />
                          </button>
                        </div>
                        <p className="mt-3 line-clamp-6 whitespace-pre-wrap word-break-words text-body-medium overflow-y-scroll">
                          {memo.content}
                        </p>
                      </div>
                      <div className="flex shrink-0 items-center justify-between gap-3 text-body-small">
                        <span>{TAG_LABELS[memo.category]}</span>
                        <time dateTime={memo.date}>
                          {memo.date.replaceAll("-", ".")}
                        </time>
                      </div>
                    </article>
                  </li>
                ))}
              </ul>
            ))}
        </div>
      )}
    </section>
  );
};

export default MemoLists;
