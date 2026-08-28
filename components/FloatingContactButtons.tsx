"use client";

import { useState } from "react";

type FloatingContactButtonsProps = {
  blogUrl?: string | null;
  instagramUrl?: string | null;
  kakaoUrl?: string | null;
  email?: string | null;
  phone?: string | null;
};

type IconButtonProps = {
  label: string;
  href?: string;
  onClick?: () => void;
  children: React.ReactNode;
  external?: boolean;
};

function IconButton({
  label,
  href,
  onClick,
  children,
  external = false,
}: IconButtonProps) {
  const className = `
    group relative flex h-11 w-11 items-center justify-center
    rounded-full border border-black/10
    bg-white/90 text-neutral-800
    shadow-[0_6px_24px_rgba(0,0,0,0.07)]
    backdrop-blur-md
    transition-all duration-300 ease-out
    hover:-translate-y-0.5
    hover:scale-105
    hover:border-black/20
    hover:bg-neutral-900
    hover:text-white
    md:h-12 md:w-12
  `;

  const content = (
    <>
      {children}

      {/* Desktop Tooltip */}
      <span
        className="
          pointer-events-none
          absolute right-[calc(100%+10px)] top-1/2
          hidden -translate-y-1/2 translate-x-1
          whitespace-nowrap rounded-full
          bg-neutral-900 px-3 py-1.5
          text-[11px] font-medium
          tracking-[-0.01em] text-white
          opacity-0 shadow-lg
          transition-all duration-200
          group-hover:translate-x-0
          group-hover:opacity-100
          md:block
        "
      >
        {label}
      </span>
    </>
  );

  if (href) {
    return (
      <a
        href={href}
        target={external ? "_blank" : undefined}
        rel={external ? "noopener noreferrer" : undefined}
        aria-label={label}
        className={className}
      >
        {content}
      </a>
    );
  }

  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      className={className}
    >
      {content}
    </button>
  );
}

function BlogIcon() {
  return (
    <span className="text-[15px] font-black tracking-[-0.08em]">
      N
    </span>
  );
}

function InstagramIcon() {
  return (
    <svg
      width="19"
      height="19"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <rect
        width="18"
        height="18"
        x="3"
        y="3"
        rx="5"
      />

      <circle
        cx="12"
        cy="12"
        r="4"
      />

      <circle
        cx="17.5"
        cy="6.5"
        r="0.7"
        fill="currentColor"
        stroke="none"
      />
    </svg>
  );
}

function KakaoIcon() {
  return (
    <svg
      width="21"
      height="21"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M12 4C6.9 4 3 7.2 3 11.1c0 2.5 1.6 4.7 4.1 5.9l-.8 3 3.6-2.2c.7.1 1.4.2 2.1.2 5.1 0 9-3.1 9-6.9S17.1 4 12 4Z"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function MailIcon() {
  return (
    <svg
      width="19"
      height="19"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <rect
        width="18"
        height="14"
        x="3"
        y="5"
        rx="2"
      />

      <path d="m3 7 9 6 9-6" />
    </svg>
  );
}

function PhoneIcon() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M22 16.9v3a2 2 0 0 1-2.18 2 19.8 19.8 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.12 4.18 2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.12.9.33 1.78.62 2.63a2 2 0 0 1-.45 2.11L8 9.73a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.85.29 1.73.5 2.63.62A2 2 0 0 1 22 16.9Z" />
    </svg>
  );
}

export default function FloatingContactButtons({
  blogUrl,
  instagramUrl,
  kakaoUrl,
  email,
  phone,
}: FloatingContactButtonsProps) {
  const [copied, setCopied] = useState(false);

  const copyEmail = async () => {
    if (!email) {
      return;
    }

    try {
      await navigator.clipboard.writeText(email);

      setCopied(true);

      window.setTimeout(() => {
        setCopied(false);
      }, 1800);
    } catch {
      window.location.href = `mailto:${email}`;
    }
  };

  const cleanPhone = phone
    ? phone.replace(/[^0-9+]/g, "")
    : "";

  return (
    <>
      {/* Desktop */}
      <aside
        className="
          fixed right-5 top-1/2 z-[90]
          hidden -translate-y-1/2
          flex-col gap-2
          md:flex
          lg:right-7
        "
        aria-label="디자인스무디 바로가기"
      >
        {blogUrl && (
          <IconButton
            label="네이버 블로그"
            href={blogUrl}
            external
          >
            <BlogIcon />
          </IconButton>
        )}

        {instagramUrl && (
          <IconButton
            label="인스타그램"
            href={instagramUrl}
            external
          >
            <InstagramIcon />
          </IconButton>
        )}

        {kakaoUrl && (
          <IconButton
            label="카카오채널"
            href={kakaoUrl}
            external
          >
            <KakaoIcon />
          </IconButton>
        )}

        {email && (
          <div className="relative">
            <IconButton
              label={
                copied
                  ? "메일주소 복사완료"
                  : "메일주소 복사"
              }
              onClick={copyEmail}
            >
              <MailIcon />
            </IconButton>

            {copied && (
              <span
                className="
                  pointer-events-none
                  absolute right-[calc(100%+10px)]
                  top-1/2 -translate-y-1/2
                  whitespace-nowrap rounded-full
                  bg-neutral-900 px-3 py-1.5
                  text-[11px] font-medium
                  text-white shadow-lg
                "
              >
                복사했어요
              </span>
            )}
          </div>
        )}

        {phone && (
          <IconButton
            label="전화하기"
            href={`tel:${cleanPhone}`}
          >
            <PhoneIcon />
          </IconButton>
        )}
      </aside>

      {/* Mobile */}
      <aside
        className="
          fixed bottom-4 left-1/2 z-[90]
          flex -translate-x-1/2
          items-center gap-1.5
          rounded-full
          border border-black/10
          bg-white/85 p-1.5
          shadow-[0_8px_30px_rgba(0,0,0,0.12)]
          backdrop-blur-xl
          md:hidden
        "
        aria-label="디자인스무디 바로가기"
      >
        {blogUrl && (
          <IconButton
            label="네이버 블로그"
            href={blogUrl}
            external
          >
            <BlogIcon />
          </IconButton>
        )}

        {instagramUrl && (
          <IconButton
            label="인스타그램"
            href={instagramUrl}
            external
          >
            <InstagramIcon />
          </IconButton>
        )}

        {kakaoUrl && (
          <IconButton
            label="카카오채널"
            href={kakaoUrl}
            external
          >
            <KakaoIcon />
          </IconButton>
        )}

        {email && (
          <IconButton
            label={
              copied
                ? "메일주소 복사완료"
                : "메일주소 복사"
            }
            onClick={copyEmail}
          >
            <MailIcon />
          </IconButton>
        )}

        {phone && (
          <IconButton
            label="전화하기"
            href={`tel:${cleanPhone}`}
          >
            <PhoneIcon />
          </IconButton>
        )}
      </aside>
    </>
  );
}