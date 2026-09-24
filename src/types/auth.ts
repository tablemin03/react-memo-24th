import type { BaseResponse } from "./response";

export interface authRequest {
  email: string;
  password: string;
}

export interface signupResult {
  userId: number;
  email: string;
}

export interface loginResult {
  accessToken: string;
}

export type signupResponse = BaseResponse<signupResult>;
export type loginResponse = BaseResponse<loginResult>;
