import { useEffect, useRef } from "react";
import type { MouseEvent } from "react";
import type { Memo } from "../types/memos";
import { MEMO_COLORS, TAG_COLORS, TAG_LABELS } from "../constants/tags";
import ExitIcon from "./icons/ExitIcon";
import EditIcon from "./icons/EditIcon";
import TrashIcon from "./icons/TrashIcon";

type MemoModalProps = {
  memo: Memo;
  onClose: () => void;
};

export default function MemoModal({ memo, onClose }: MemoModalProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);

  const clickOutside = (e: MouseEvent<HTMLDialogElement>) => {
    if (e.target !== e.currentTarget) return;

    const rect = e.currentTarget.getBoundingClientRect();
    const isOutside =
      e.clientX < rect.left ||
      e.clientX > rect.right ||
      e.clientY < rect.top ||
      e.clientY > rect.bottom;

    if (isOutside) onClose();
  };

  useEffect(() => {
    const dialog = dialogRef.current;
    dialog?.showModal();
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      dialog?.close();
      document.body.style.overflow = previousOverflow;
    };
  }, []);

  return (
    <dialog
      ref={dialogRef}
      id="modal-memo"
      aria-labelledby="modal-memo-heading"
      className={`fixed inset-0 m-auto max-h-[85dvh] w-139 h-139 py-10 px-11 overflow-y-hidden rounded-[24px] text-white00 shadow-xl backdrop:bg-blue07/50 ${MEMO_COLORS[memo.category]}`}
      onCancel={(event) => {
        event.preventDefault();
        onClose();
      }}
      onClick={clickOutside}
    >
      <form
        id="memo-form"
        className="flex flex-col h-full gap-6"
        onSubmit={(event) => event.preventDefault()}
      >
        <div
          id="modal-header"
          className="flex items-start justify-between gap-4"
        >
          <h2
            id="modal-memo-heading"
            className="min-w-0 break-words text-heading-large"
          >
            {memo.title}
          </h2>
          <button
            type="button"
            aria-label="모달 닫기"
            onClick={onClose}
            className="shrink-0 cursor-pointer p-2 text-white00"
          >
            <ExitIcon size={24} />
          </button>
        </div>

        <div
          id="modal-tag-date"
          className="flex flex-wrap items-center justify-start gap-6"
        >
          <div
            className={`inline-flex items-center gap-2 rounded-[36px] bg-blue01 px-4 py-1 text-action-medium ${TAG_COLORS[memo.category]}`}
          >
            <span
              className="size-5 rounded-full bg-current"
              aria-hidden="true"
            />
            <span>{TAG_LABELS[memo.category]}</span>
          </div>
          <time
            id="modal-memo-date"
            dateTime={memo.date}
            className="flex border-l-3 h-13 items-center border-white00 pl-4 text-heading-small text-white00"
          >
            {memo.date.replaceAll("-", ".")}
          </time>
        </div>

        <div
          id="modal-memo-content"
          className="min-h-60 whitespace-pre-wrap overflow-scroll  wrap-break-words pt-5.5s text-body-large"
        >
          {memo.content || "내용이 없는 메모입니다."}
        </div>
        <div className="flex justify-end gap-3">
          <button className="flex cursor-pointer" type="button">
            <EditIcon size={32} />
          </button>
          <button className="flex cursor-pointer" type="button">
            <TrashIcon size={32} />
          </button>
        </div>
      </form>
    </dialog>
  );
}
