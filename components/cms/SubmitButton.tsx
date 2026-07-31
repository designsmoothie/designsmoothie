type SubmitButtonProps = {
  children: React.ReactNode;
};

export default function SubmitButton({
  children,
}: SubmitButtonProps) {
  return (
    <button
      type="submit"
      className="inline-flex h-12 items-center justify-center rounded-full bg-black px-6 text-sm font-medium !text-white transition hover:bg-black/80"
    >
      {children}
    </button>
  );
}