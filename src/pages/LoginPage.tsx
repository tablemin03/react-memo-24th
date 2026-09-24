import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { useAuthStore } from "../stores/useAuthStore";
import { postLogin } from "../apis/auth";

type LoginFormValues = {
  email: string;
  password: string;
};

export default function LoginPage() {
  const [submitMessage, setSubmitMessage] = useState("");
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isValid },
  } = useForm<LoginFormValues>({
    defaultValues: { email: "", password: "" },
    mode: "onChange",
  });

  const navigate = useNavigate();
  const setAccessToken = useAuthStore((state) => state.setAccessToken);

  const onSubmit = async (values: LoginFormValues) => {
    setSubmitMessage("");

    try {
      const response = await postLogin(values);

      if (!response.success || !response.data?.accessToken) {
        setSubmitMessage(response.message || "로그인에 실패했습니다.");

        return;
      }

      setAccessToken(response.data.accessToken);

      navigate("/", { replace: true });
    } catch {
      setSubmitMessage("로그인에 실패했습니다. 다시 시도해주세요.");
    }
  };

  return (
    <div className="flex flex-col w-screen min-h-dvh bg-blue01 justify-center items-center">
      <div className="flex flex-col w-140">
        <form
          className="flex flex-1 flex-col gap-4"
          noValidate
          onSubmit={handleSubmit(onSubmit)}
        >
          <input
            type="email"
            autoComplete="username"
            aria-label="아이디 (이메일)"
            aria-invalid={!!errors.email}
            aria-describedby={errors.email ? "login-email-error" : undefined}
            placeholder="아이디를 입력하세요"
            {...register("email", {
              required: "이메일을 입력해주세요.",
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: "이메일 형식으로 입력해주세요.",
              },
            })}
            className="px-5 py-4 bg-white00 rounded-[12px] text-field-medium placeholder:text-gray02"
          ></input>
          {errors.email && (
            <p
              id="login-email-error"
              role="alert"
              className="text-body-small text-point"
            >
              {errors.email.message}
            </p>
          )}
          <input
            type="password"
            autoComplete="current-password"
            aria-label="비밀번호"
            aria-invalid={!!errors.password}
            aria-describedby={
              errors.password ? "login-password-error" : undefined
            }
            {...register("password", { required: "비밀번호를 입력해주세요." })}
            {...register("password", {
              minLength: {
                value: 8,
                message: "비밀번호는 8자 이상 입력해주세요.",
              },
            })}
            placeholder="비밀번호를 입력하세요"
            className="px-5 py-4 bg-white00 rounded-[12px] text-field-medium placeholder:text-gray02"
          ></input>
          {errors.password && (
            <p
              id="login-password-error"
              role="alert"
              className="text-body-small text-point"
            >
              {errors.password.message}
            </p>
          )}
          {submitMessage && (
            <p role="status" className="text-body-small text-point">
              {submitMessage}
            </p>
          )}
          <button
            type="submit"
            disabled={!isValid || isSubmitting}
            className="mt-6 mb-7 px-5 py-4 text-white00 disabled:text-gray01 text-action-medium bg-blue05 disabled:bg-blue03 rounded-[12px] cursor-pointer disabled:cursor-not-allowed"
          >
            로그인
          </button>
        </form>
        <div className="flex flex-row justify-center gap-8 text-gray03">
          <Link to="/signup" className="cursor-pointer">
            <p>회원가입</p>
          </Link>
          <button className="cursor-pointer">
            <p>아이디 찾기</p>
          </button>
          <button className="cursor-pointer">
            <p>비밀번호 찾기</p>
          </button>
        </div>
      </div>
    </div>
  );
}
