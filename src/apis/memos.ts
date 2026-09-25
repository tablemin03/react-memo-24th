import { axiosInstance } from "./axios";
import type { GetMemosParams, MemoResponse } from "../types/memos";

export const getMemos = async ({
  page,
  size,
}: GetMemosParams): Promise<MemoResponse> => {
  const response = await axiosInstance.get<MemoResponse>("/api/memos", {
    params: { page, size },
  });

  if (!response.data.success) {
    throw new Error(
      response.data.message || "메모 목록을 불러오지 못했습니다.",
    );
  }

  return response.data;
};
