import { useState } from "react";
import { isAxiosError } from "axios";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { postSignup } from "../apis/auth";

type SignupFormValues = {
  email: string;
  password: string;
  passwordConfirm: string;
};

export default function SignupPage() {
  const navigate = useNavigate();
  const [message, setMessage] = useState("");
  const {
    register,
    handleSubmit,
    formState: { errors, isValid, isSubmitting },
  } = useForm<SignupFormValues>({
    defaultValues: { email: "", password: "", passwordConfirm: "" },
    mode: "onChange",
  });

  const onSubmit = async ({ email, password }: SignupFormValues) => {
    setMessage("");

    try {
      const response = await postSignup({ email, password });

      if (!response.success) {
        setMessage("회원가입에 실패했습니다. 다시 시도해주세요.");
        return;
      }

      navigate("/login", { replace: true });
    } catch (error) {
      const status = isAxiosError(error) ? error.response?.status : undefined;

      switch (status) {
        case 400:
          setMessage("이메일 형식과 비밀번호를 확인해주세요. 비밀번호는 8자 이상이어야 합니다.");
          break;
        case 409:
          setMessage("이미 가입된 이메일입니다.");
          break;
        default:
          setMessage("회원가입에 실패했습니다. 잠시 후 다시 시도해주세요.");
      }
    }
  };

  return (
    <div className="flex flex-col w-screen min-h-dvh bg-blue01 justify-center items-center">
      <div className="flex flex-col w-140">
        <form
          className="flex flex-1 flex-col gap-4"
          noValidate
          onChange={() => setMessage("")}
          onSubmit={handleSubmit(onSubmit)}
        >
          <input
            type="email"
            autoComplete="username"
            aria-label="아이디(이메일)"
            placeholder="아이디를 입력하세요"
            aria-invalid={!!errors.email}
            aria-describedby={errors.email ? "signup-email-error" : undefined}
            {...register("email", {
              required: "이메일을 입력해주세요.",
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: "이메일 형식으로 입력해주세요.",
              },
            })}
            className="px-5 py-4 bg-white00 rounded-[12px] text-field-medium placeholder:text-gray02"
          />
          {errors.email && (
            <p
              id="signup-email-error"
              role="alert"
              className="text-body-small text-point"
            >
              {errors.email.message}
            </p>
          )}
          <input
            type="password"
            autoComplete="new-password"
            aria-label="비밀번호"
            placeholder="비밀번호를 입력하세요"
            aria-invalid={!!errors.password}
            aria-describedby={
              errors.password?.message ? "signup-password-error" : undefined
            }
            {...register("password", {
              required: true,
              minLength: {
                value: 8,
                message: "비밀번호는 8자 이상 입력해주세요.",
              },
              deps: ["passwordConfirm"],
            })}
            className="px-5 py-4 bg-white00 rounded-[12px] text-field-medium placeholder:text-gray02"
          />
          {errors.password?.message && (
            <p
              id="signup-password-error"
              role="alert"
              className="text-body-small text-point"
            >
              {errors.password.message}
            </p>
          )}
          <input
            type="password"
            autoComplete="new-password"
            aria-label="비밀번호 확인"
            placeholder="비밀번호를 다시 입력해주세요"
            aria-invalid={!!errors.passwordConfirm}
            aria-describedby={
              errors.passwordConfirm?.message
                ? "signup-password-confirm-error"
                : undefined
            }
            {...register("passwordConfirm", {
              required: true,
              minLength: {
                value: 8,
                message: "비밀번호는 8자 이상 입력해주세요.",
              },
              validate: (value, values) =>
                value === values.password || "비밀번호가 일치하지 않습니다.",
            })}
            className="px-5 py-4 bg-white00 rounded-[12px] text-field-medium placeholder:text-gray02"
          />
          {errors.passwordConfirm?.message && (
            <p
              id="signup-password-confirm-error"
              role="alert"
              className="text-body-small text-point"
            >
              {errors.passwordConfirm.message}
            </p>
          )}
          {message && (
            <p role="status" className="text-body-small text-point">
              {message}
            </p>
          )}
          <button
            type="submit"
            disabled={!isValid || isSubmitting}
            className="mt-6 mb-7 px-5 py-4 text-white00 disabled:text-gray01 text-action-medium bg-blue05 disabled:bg-blue03 rounded-[12px] cursor-pointer disabled:cursor-not-allowed"
          >
            {isSubmitting ? "가입 중..." : "회원가입"}
          </button>
        </form>
        <div className="flex flex-row justify-center gap-8 text-gray03">
          <Link to="/login" className="cursor-pointer">
            로그인
          </Link>
        </div>
      </div>
    </div>
  );
}
