import { ReactNode } from "react";

type FormCardProps = {
  title: string;
  description?: string;
  children: ReactNode;
};

export default function FormCard({
  title,
  description,
  children,
}: FormCardProps) {
  return (
    <section className="rounded-2xl border border-black/10 bg-white p-6">
      <div className="mb-6">
        <h2 className="text-lg font-semibold text-black">
          {title}
        </h2>

        {description && (
          <p className="mt-1 text-sm text-black/45">
            {description}
          </p>
        )}
      </div>

      {children}
    </section>
  );
}