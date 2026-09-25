import type { MemoTag } from "../types/memos";

export const TAG_LABELS = {
  WORK: "Work",
  DAILY: "Daily",
  OTHER: "Others",
} satisfies Record<MemoTag, string>;

export const TAG_COLORS = {
  WORK: "text-blue06",
  DAILY: "text-blue04",
  OTHER: "text-gray03",
} satisfies Record<MemoTag, string>;

export const MEMO_COLORS = {
  WORK: "bg-blue06",
  DAILY: "bg-blue03",
  OTHER: "bg-gray02",
} satisfies Record<MemoTag, string>;

export const TAG_OPTIONS = [
  { value: "WORK", label: TAG_LABELS.WORK },
  { value: "DAILY", label: TAG_LABELS.DAILY },
  { value: "OTHER", label: TAG_LABELS.OTHER },
] satisfies { value: MemoTag; label: string }[];
