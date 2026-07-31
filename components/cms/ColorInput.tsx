type ColorInputProps = {
  label: string;
  name: string;
  defaultValue?: string;
};

export default function ColorInput({
  label,
  name,
  defaultValue = "#94b63f",
}: ColorInputProps) {
  return (
    <label className="grid gap-2">
      <span className="text-sm font-medium text-black/70">
        {label}
      </span>

      <input
        type="color"
        name={name}
        defaultValue={defaultValue}
        className="h-12 w-16 cursor-pointer rounded-xl border border-black/10 bg-white p-1"
      />
    </label>
  );
}