import type { BaseResponse } from "./response";

export type MemoTag = "WORK" | "DAILY" | "OTHER";

export interface Memo {
  id: number;
  title: string;
  content: string;
  date: string;
  category: MemoTag;
  isPinned: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface MemoResult {
  content: Memo[];
  page: number;
  size: number;
  totalElements: number;
  totalPages: number;
  last: boolean;
}

export interface GetMemosParams {
  page?: number;
  size?: number;
}

export type MemoResponse = BaseResponse<MemoResult>;
