import { axiosInstance } from "./axios";
import type { signupResponse, loginResponse, authRequest } from "../types/auth";

export const postSignup = async ({
  email,
  password,
}: authRequest): Promise<signupResponse> => {
  const response = await axiosInstance.post<signupResponse>(
    "/api/auth/signup",
    {
      email,
      password,
    },
  );
  return response.data;
};

export const postLogin = async ({
  email,
  password,
}: authRequest): Promise<loginResponse> => {
  const response = await axiosInstance.post<loginResponse>("/api/auth/login", {
    email,
    password,
  });
  return response.data;
};
