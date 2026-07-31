type TextAreaProps = {
  label: string;
  name: string;
  defaultValue?: string;
  placeholder?: string;
};

export default function TextArea({
  label,
  name,
  defaultValue,
  placeholder,
}: TextAreaProps) {
  return (
    <label className="grid gap-2">
      <span className="text-sm font-medium text-black/70">
        {label}
      </span>

      <textarea
        name={name}
        defaultValue={defaultValue}
        placeholder={placeholder}
        rows={4}
        className="resize-none rounded-xl border border-black/10 bg-white px-4 py-3 text-sm outline-none transition focus:border-black/30"
      />
    </label>
  );
}