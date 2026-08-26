import { AlertTriangle } from "lucide-react";
import { useEffect } from "react";
import { Button } from "@/components/ui/saviz-button";

export type ConfirmState = {
  title: string;
  description: string;
  confirmLabel?: string;
  danger?: boolean;
  onConfirm: () => void;
} | null;

export function ConfirmDialog({
  state,
  onClose,
}: {
  state: ConfirmState;
  onClose: () => void;
}) {
  useEffect(() => {
    if (!state) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [state, onClose]);

  if (!state) return null;

  return (
    <div
      className="fixed inset-0 z-100 flex items-center justify-center bg-black/70 p-4"
      role="dialog"
      aria-modal="true"
      aria-label={state.title}
      onClick={onClose}
    >
      <div
        className="w-full max-w-md rounded-2xl border border-border bg-background-secondary p-6 shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-start gap-3">
          <AlertTriangle
            className={`mt-0.5 size-5 shrink-0 ${state.danger ? "text-error" : "text-warning"}`}
          />
          <div>
            <h2 className="text-base font-semibold">{state.title}</h2>
            <p className="mt-2 text-sm text-muted-foreground">{state.description}</p>
          </div>
        </div>
        <div className="mt-6 flex flex-wrap justify-end gap-3">
          <Button variant="ghost" onClick={onClose}>
            Cancelar
          </Button>
          <Button
            variant={state.danger ? "secondary" : "primary"}
            className={state.danger ? "text-error hover:text-error" : undefined}
            onClick={() => {
              state.onConfirm();
              onClose();
            }}
          >
            {state.confirmLabel ?? "Confirmar"}
          </Button>
        </div>
      </div>
    </div>
  );
}
