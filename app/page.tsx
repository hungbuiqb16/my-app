import Image from "next/image";
import Link from "next/link";

const IMG_LOGIN_ART =
  "https://www.figma.com/api/mcp/asset/9bae3ebb-ce66-45b5-975b-5f18b561362c";
const IMG_GOOGLE =
  "https://www.figma.com/api/mcp/asset/c06396c4-f930-41d8-9a67-863a4c9c47d3";
const IMG_FACEBOOK =
  "https://www.figma.com/api/mcp/asset/c4a3cb6f-cb21-43db-bf5e-bad3edc6324a";

export default function LoginPage() {
  return (
    <div className="flex items-center justify-center gap-8 p-8 w-full h-full min-h-screen bg-white">
      {/* Left — Login Form */}
      <div className="flex flex-1 h-full items-center justify-center min-w-0">
        <div className="flex flex-col gap-12 w-[388px]">
          {/* Intro */}
          <div className="flex flex-col gap-7">
            <h1
              className="text-[36px] tracking-[0.36px] text-[#0c1421] leading-none whitespace-pre"
              style={{ fontFamily: "'SF Pro Rounded', system-ui, sans-serif" }}
            >
              <span className="font-semibold">Welcome Back </span>
              <span className="font-normal">👋</span>
            </h1>
            <p
              className="text-[20px] text-[#313957] tracking-[0.2px] leading-[1.6]"
              style={{ fontFamily: "'SF Pro Display', system-ui, sans-serif" }}
            >
              Today is a new day. It&apos;s your day. You shape it.{" "}
              <br />
              Sign in to start managing your projects.
            </p>
          </div>

          {/* Form */}
          <div className="flex flex-col gap-6 w-full">
            {/* Email */}
            <div className="flex flex-col gap-2 w-full">
              <label
                htmlFor="email"
                className="text-[16px] font-normal text-[#0c1421] tracking-[0.16px]"
                style={{ fontFamily: "Roboto, Arial, sans-serif" }}
              >
                Email
              </label>
              <input
                id="email"
                type="email"
                placeholder="Example@email.com"
                className="w-full h-12 bg-[#f7fbff] border border-[#d4d7e3] rounded-xl px-4 text-[16px] text-[#8897ad] tracking-[0.16px] outline-none focus:border-[#162d3a] transition-colors"
                style={{ fontFamily: "Roboto, Arial, sans-serif" }}
              />
            </div>

            {/* Password */}
            <div className="flex flex-col gap-2 w-full">
              <label
                htmlFor="password"
                className="text-[16px] font-normal text-[#0c1421] tracking-[0.16px]"
                style={{ fontFamily: "Roboto, Arial, sans-serif" }}
              >
                Password
              </label>
              <input
                id="password"
                type="password"
                placeholder="At least 8 characters"
                className="w-full h-12 bg-[#f7fbff] border border-[#d4d7e3] rounded-xl px-4 text-[16px] text-[#8897ad] tracking-[0.16px] outline-none focus:border-[#162d3a] transition-colors"
                style={{ fontFamily: "Roboto, Arial, sans-serif" }}
              />
            </div>

            {/* Forgot Password */}
            <div className="flex justify-end">
              <Link
                href="#"
                className="text-[16px] text-[#1e4ae9] tracking-[0.16px]"
                style={{ fontFamily: "Roboto, Arial, sans-serif" }}
              >
                Forgot Password?
              </Link>
            </div>

            {/* Sign In Button */}
            <button
              type="submit"
              className="w-full bg-[#162d3a] text-white text-[20px] tracking-[0.2px] rounded-xl py-4 text-center hover:bg-[#1e3f52] transition-colors cursor-pointer"
              style={{ fontFamily: "Roboto, Arial, sans-serif" }}
            >
              Sign in
            </button>
          </div>

          {/* Social Sign In */}
          <div className="flex flex-col gap-6">
            {/* Or divider */}
            <div className="flex items-center gap-4 py-2.5">
              <div className="flex-1 h-px bg-[#d4d7e3]" />
              <span
                className="text-[16px] text-[#294957] tracking-[0.16px]"
                style={{ fontFamily: "Roboto, Arial, sans-serif" }}
              >
                Or
              </span>
              <div className="flex-1 h-px bg-[#d4d7e3]" />
            </div>

            {/* Social Buttons */}
            <div className="flex flex-col gap-4">
              <button
                type="button"
                className="w-full flex items-center justify-center gap-4 bg-[#f3f9fa] rounded-xl px-3 py-3 hover:bg-[#e8f4f6] transition-colors cursor-pointer"
              >
                <img
                  src={IMG_GOOGLE}
                  alt="Google"
                  width={28}
                  height={28}
                  className="shrink-0"
                />
                <span
                  className="text-[16px] text-[#313957] tracking-[0.16px]"
                  style={{ fontFamily: "Roboto, Arial, sans-serif" }}
                >
                  Sign in with Google
                </span>
              </button>

              <button
                type="button"
                className="w-full flex items-center justify-center gap-4 bg-[#f3f9fa] rounded-xl px-3 py-3 hover:bg-[#e8f4f6] transition-colors cursor-pointer"
              >
                <img
                  src={IMG_FACEBOOK}
                  alt="Facebook"
                  width={28}
                  height={28}
                  className="shrink-0"
                />
                <span
                  className="text-[16px] text-[#313957] tracking-[0.16px]"
                  style={{ fontFamily: "Roboto, Arial, sans-serif" }}
                >
                  Sign in with Facebook
                </span>
              </button>
            </div>
          </div>

          {/* Sign Up link */}
          <p
            className="text-[18px] text-center tracking-[0.18px]"
            style={{ fontFamily: "Roboto, Arial, sans-serif" }}
          >
            <span className="text-[#313957] leading-[1.6]">
              Don&apos;t you have an account?{" "}
            </span>
            <Link href="#" className="text-[#1e4ae9] leading-[1.6]">
              Sign up
            </Link>
          </p>
        </div>
      </div>

      {/* Right — Art */}
      <div className="flex flex-1 h-full min-w-0 min-h-[600px] relative">
        <div className="relative w-full h-full rounded-3xl overflow-hidden min-h-[600px]">
          <Image
            src={IMG_LOGIN_ART}
            alt="Login decorative art"
            fill
            className="object-cover rounded-3xl"
            priority
          />
        </div>
      </div>
    </div>
  );
}
