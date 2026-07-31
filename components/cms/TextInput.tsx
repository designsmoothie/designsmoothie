type TextInputProps = {
  label: string;
  name: string;
  placeholder?: string;
  defaultValue?: string;
  required?: boolean;
};

export default function TextInput({
  label,
  name,
  placeholder,
  defaultValue,
  required,
}: TextInputProps) {
  return (
    <label className="grid gap-2">
      <span className="text-sm font-medium text-black/70">
        {label}
      </span>

      <input
        type="text"
        name={name}
        defaultValue={defaultValue}
        placeholder={placeholder}
        required={required}
        className="h-12 rounded-xl border border-black/10 bg-white px-4 text-sm outline-none transition focus:border-black/30"
      />
    </label>
  );
}