import { Eye, EyeOff } from "lucide-react";
import { type ComponentProps, useId, useState } from "react";
import { cn } from "@/lib/utils";

const inputBase =
  "h-11 w-full rounded-lg border border-border bg-background-tertiary px-4 text-sm text-foreground placeholder:text-muted-foreground/70 transition-colors duration-200 focus:border-primary/70 focus:outline-none focus:ring-2 focus:ring-ring/40";

const inputError = "border-destructive/70 focus:border-destructive focus:ring-destructive/30";

function FieldMessage({ error, hint, id }: { error?: string; hint?: string; id: string }) {
  if (error) {
    return (
      <p id={`${id}-error`} role="alert" className="text-xs font-medium text-destructive">
        {error}
      </p>
    );
  }
  if (hint) return <p className="text-xs text-muted-foreground">{hint}</p>;
  return null;
}

export function Field({
  label,
  hint,
  error,
  className,
  ...props
}: ComponentProps<"input"> & { label: string; hint?: string; error?: string }) {
  const id = useId();
  return (
    <div className={cn("space-y-2", className)}>
      <label htmlFor={id} className="block text-sm font-medium">
        {label}
      </label>
      <input
        id={id}
        aria-invalid={error ? true : undefined}
        aria-describedby={error ? `${id}-error` : undefined}
        className={cn(inputBase, error && inputError)}
        {...props}
      />
      <FieldMessage error={error} hint={hint} id={id} />
    </div>
  );
}

export function PasswordField({
  label,
  hint,
  error,
  className,
  ...props
}: ComponentProps<"input"> & { label: string; hint?: string; error?: string }) {
  const id = useId();
  const [show, setShow] = useState(false);
  return (
    <div className={cn("space-y-2", className)}>
      <label htmlFor={id} className="block text-sm font-medium">
        {label}
      </label>
      <div className="relative">
        <input
          id={id}
          type={show ? "text" : "password"}
          aria-invalid={error ? true : undefined}
          aria-describedby={error ? `${id}-error` : undefined}
          className={cn(inputBase, "pr-11", error && inputError)}
          {...props}
        />
        <button
          type="button"
          aria-label={show ? "Ocultar senha" : "Mostrar senha"}
          onClick={() => setShow((v) => !v)}
          className="absolute inset-y-0 right-0 flex w-11 items-center justify-center text-muted-foreground transition-colors duration-200 hover:text-foreground"
        >
          {show ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
        </button>
      </div>
      <FieldMessage error={error} hint={hint} id={id} />
    </div>
  );
}

export function TextareaField({
  label,
  hint,
  error,
  className,
  ...props
}: ComponentProps<"textarea"> & { label: string; hint?: string; error?: string }) {
  const id = useId();
  return (
    <div className={cn("space-y-2", className)}>
      <label htmlFor={id} className="block text-sm font-medium">
        {label}
      </label>
      <textarea
        id={id}
        aria-invalid={error ? true : undefined}
        aria-describedby={error ? `${id}-error` : undefined}
        className={cn(
          "w-full rounded-lg border border-border bg-background-tertiary px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/70 transition-colors duration-200 focus:border-primary/70 focus:outline-none focus:ring-2 focus:ring-ring/40",
          error && inputError,
        )}
        {...props}
      />
      <FieldMessage error={error} hint={hint} id={id} />
    </div>
  );
}

export function CheckboxField({
  label,
  error,
  className,
  ...props
}: ComponentProps<"input"> & { label: React.ReactNode; error?: string }) {
  const id = useId();
  return (
    <div className="space-y-1.5">
      <label htmlFor={id} className={cn("flex items-start gap-3 text-sm text-muted-foreground", className)}>
        <input
          id={id}
          type="checkbox"
          aria-invalid={error ? true : undefined}
          className="mt-0.5 size-4 shrink-0 rounded border-border bg-background-tertiary accent-[var(--primary)]"
          {...props}
        />
        <span>{label}</span>
      </label>
      {error ? (
        <p role="alert" className="text-xs font-medium text-destructive">
          {error}
        </p>
      ) : null}
    </div>
  );
}
