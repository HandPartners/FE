import { useEffect, useState } from "react";
import type { FormEvent } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { ADMIN_FLAG_KEY } from "../../layouts/AdminLayout";

const AdminLogin = () => {
  const [code, setCode] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const from = (location.state as { from?: string } | null)?.from ?? "/admin";

  useEffect(() => {
    sessionStorage.removeItem(ADMIN_FLAG_KEY);
  }, []);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (code === ADMIN_FLAG_KEY) {
      sessionStorage.setItem(ADMIN_FLAG_KEY, "true");
      navigate(from, { replace: true });
    } else {
      setError("잘못된 인증코드입니다.");
    }
  };

  return (
    <main className="flex flex-col items-center  min-h-screen">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col w-[542px] border translate-y-[30%] p-[40px] border-[var(--grey3)]"
      >
        <h1 className="h4-bold font-bold whitespace-nowrap mb-[90px]">
          함께 고민하고, 스케일업을 돕는 진정성 있는 파트너
          <br />
          <span className="text-[#2E3093]"> 핸드파트너스 </span>
          입니다.
        </h1>
        <span className="h4-medium mb-[14px]">인증코드</span>
        <div className="relative w-full ">
          <input
            type="password"
            className={`border-b-[1.5px] ${
              error ? "border-[#FF0000]" : "border-[var(--grey3)]"
            } px-[3px] py-2 placeholder:text-[var(--grey3)] h5-medium w-full focus:outline-none`}
            placeholder="인증코드를 입력해주세요."
            value={code}
            onChange={(e) => {
              setCode(e.target.value);
              setError("");
            }}
          />
          {error && (
            <p className="text-[#F00] absolute mt-[10px] flex items-center gap-[5px] p-small-medium">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
              >
                <path
                  d="M10 1.25C5.16797 1.25 1.25 5.16797 1.25 10C1.25 14.832 5.16797 18.75 10 18.75C14.832 18.75 18.75 14.832 18.75 10C18.75 5.16797 14.832 1.25 10 1.25ZM10 17.2656C5.98828 17.2656 2.73438 14.0117 2.73438 10C2.73438 5.98828 5.98828 2.73438 10 2.73438C14.0117 2.73438 17.2656 5.98828 17.2656 10C17.2656 14.0117 14.0117 17.2656 10 17.2656Z"
                  fill="#FF0000"
                />
                <path
                  d="M9.0625 13.4375C9.0625 13.6861 9.16127 13.9246 9.33709 14.1004C9.5129 14.2762 9.75136 14.375 10 14.375C10.2486 14.375 10.4871 14.2762 10.6629 14.1004C10.8387 13.9246 10.9375 13.6861 10.9375 13.4375C10.9375 13.1889 10.8387 12.9504 10.6629 12.7746C10.4871 12.5988 10.2486 12.5 10 12.5C9.75136 12.5 9.5129 12.5988 9.33709 12.7746C9.16127 12.9504 9.0625 13.1889 9.0625 13.4375ZM9.53125 11.25H10.4688C10.5547 11.25 10.625 11.1797 10.625 11.0938V5.78125C10.625 5.69531 10.5547 5.625 10.4688 5.625H9.53125C9.44531 5.625 9.375 5.69531 9.375 5.78125V11.0938C9.375 11.1797 9.44531 11.25 9.53125 11.25Z"
                  fill="#FF0000"
                />
              </svg>
              {error}
            </p>
          )}
        </div>
        <button
          type="submit"
          className="w-full rounded-[5px] disabled:bg-[var(--grey4)] bg-[#00AEEF] text-white py-[14px] mt-[42px] p-medium-bold disabled:cursor-default cursor-pointer hover:bg-[#059DD7] active:bg-[#058BBF]"
          disabled={!code}
        >
          접속
        </button>
      </form>
    </main>
  );
};

export default AdminLogin;
