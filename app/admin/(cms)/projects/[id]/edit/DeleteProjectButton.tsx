"use client";

type DeleteProjectButtonProps = {
  action: () => void;
};

export default function DeleteProjectButton({
  action,
}: DeleteProjectButtonProps) {
  function handleClick(
    event: React.MouseEvent<HTMLButtonElement>,
  ) {
    const confirmed = window.confirm(
      "이 프로젝트를 정말 삭제할까요?\n삭제한 데이터는 되돌릴 수 없습니다.",
    );

    if (!confirmed) {
      event.preventDefault();
    }
  }

  return (
    <button
      type="submit"
      formAction={action}
      onClick={handleClick}
      className="rounded-xl border border-red-200 bg-white px-6 py-3 text-sm font-semibold text-red-600 transition hover:bg-red-50"
    >
      프로젝트 삭제
    </button>
  );
}