"use client";

import { useState } from "react";

type ProjectSlugFieldsProps = {
  inputClass: string;
  labelClass: string;
};

function makeSlug(value: string) {
  return value
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");
}

export default function ProjectSlugFields({
  inputClass,
  labelClass,
}: ProjectSlugFieldsProps) {
  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [slugEdited, setSlugEdited] =
    useState(false);

  function handleTitleChange(
    event: React.ChangeEvent<HTMLInputElement>,
  ) {
    const nextTitle = event.target.value;

    setTitle(nextTitle);

    if (!slugEdited) {
      setSlug(makeSlug(nextTitle));
    }
  }

  function handleSlugChange(
    event: React.ChangeEvent<HTMLInputElement>,
  ) {
    setSlugEdited(true);
    setSlug(makeSlug(event.target.value));
  }

  return (
    <>
      <label className={labelClass}>
        프로젝트명 *
        <input
          name="title"
          required
          value={title}
          onChange={handleTitleChange}
          placeholder="프로젝트명 기재"
          className={inputClass}
        />
      </label>

      <label className={labelClass}>
        슬러그 *
        <input
          name="slug"
          required
          value={slug}
          onChange={handleSlugChange}
          placeholder="홈페이지 주소(영문기재)"
          pattern="[a-z0-9-]+"
          className={inputClass}
        />

        <span className="mt-2 block text-xs font-normal text-neutral-400">
          영문 소문자, 숫자, 하이픈만 사용합니다.
        </span>
      </label>
    </>
  );
}