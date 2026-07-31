"use client";

type DeleteCategoryButtonProps = {
  categoryName: string;
};

export default function DeleteCategoryButton({
  categoryName,
}: DeleteCategoryButtonProps) {
  return (
    <button
      type="submit"
      onClick={(event) => {
        const confirmed = window.confirm(
          `"${categoryName}" 카테고리를 정말 삭제할까요?\n\n이 작업은 되돌릴 수 없습니다.`,
        );

        if (!confirmed) {
          event.preventDefault();
        }
      }}
      className="inline-flex h-12 items-center justify-center rounded-full border border-red-200 bg-white px-6 text-sm font-medium !text-red-600 transition hover:bg-red-50"
    >
      카테고리 삭제
    </button>
  );
}