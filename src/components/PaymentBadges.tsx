import React from "react";

export function PixLogo({ className = "h-4" }: { className?: string }) {
  return (
    <svg viewBox="0 0 100 36" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      {/* Official Pix Diamond Icon in Teal #32BCAD */}
      <g transform="translate(2, 4) scale(0.56)">
        <path fill="#32BCAD" d="M 25 0.039 C 22.84 0.039 20.799 0.88 19.269 2.41 L 9.68 12 L 12.93 12 C 14.53 12 16.04 12.62 17.17 13.76 L 23.94 20.53 C 24.52 21.11 25.48 21.11 26.06 20.52 L 32.83 13.76 C 33.96 12.62 35.47 12 37.07 12 L 40.32 12 L 30.73 2.41 C 29.2 0.88 27.16 0.039 25 0.039 z M 7.68 14 L 2.41 19.27 C -0.75 22.43 -0.75 27.57 2.41 30.73 L 7.68 36 L 12.93 36 C 14 36 15 35.58 15.76 34.83 L 22.53 28.06 C 23.89 26.7 26.11 26.7 27.47 28.06 L 34.24 34.83 C 35 35.58 36 36 37.07 36 L 42.32 36 L 47.59 30.73 C 50.75 27.57 50.75 22.43 47.59 19.27 L 42.32 14 L 37.07 14 C 36 14 35 14.42 34.24 15.17 L 27.47 21.94 C 26.79 22.62 25.9 22.96 25 22.96 C 24.1 22.96 23.21 22.62 22.53 21.94 L 15.76 15.17 C 15 14.42 14 14 12.93 14 L 7.68 14 z M 25 29.037 C 24.615 29.038 24.229 29.185 23.94 29.48 L 17.17 36.24 C 16.04 37.38 14.53 38 12.93 38 L 9.68 38 L 19.27 47.59 C 20.8 49.12 22.84 49.96 25 49.96 C 27.16 49.96 29.2 49.12 30.73 47.59 L 40.32 38 L 37.07 38 C 35.47 38 33.96 37.38 32.83 36.24 L 26.06 29.47 C 25.77 29.18 25.385 29.035 25 29.037 z"/>
      </g>
      {/* Stylized "pix" text in WHITE #FFFFFF */}
      <text x="36" y="25" font-family="system-ui, -apple-system, sans-serif" font-weight="800" font-size="22" fill="#FFFFFF" letter-spacing="-0.5">pix</text>
    </svg>
  );
}

export function VisaLogo({ className = "h-3.5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 78 26" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <path d="M27.35 24.76L31.28.44h6.29l-3.93 24.32h-6.29z" fill="#FFFFFF" />
      <path
        d="M49.62 1.05c-1.24-.48-3.17-.89-5.58-.89-6.14 0-10.46 3.27-10.49 7.94-.04 3.46 3.09 5.38 5.44 6.53 2.41 1.18 3.22 1.94 3.21 2.99-.02 1.62-1.94 2.36-3.74 2.36-2.5 0-3.83-.38-5.88-1.3l-.81-.38-1.02 5.09c1.37.63 3.91 1.18 6.55 1.2 6.52 0 10.77-3.22 10.82-8.2.04-2.73-1.63-4.8-5.21-6.51-2.17-1.11-3.49-1.85-3.48-2.98.01-1.03 1.15-2.09 3.63-2.09 2.05-.04 3.55.44 4.7.93l.57.27 1.08-4.95z"
        fill="#FFFFFF"
      />
      <path
        d="M57.65 19.34l2.42-6.57.43 2.18c.73 3.63 3.57 9.4 3.57 9.4h5.66L61.02.44h-5.21c-1.19 0-2.19.69-2.63 1.74l-9.26 22.58h6.58l1.31-3.61c.49-.01 5.84.19 5.84.19zm-5.01-6.14l2.25-6.17 1.3 6.17h-3.55z"
        fill="#FFFFFF"
      />
      <path
        d="M18.84.44H9.37L.03 24.76h6.58l1.31-3.62h8.07l.76 3.62h5.79L18.84.44zm-9.03 15.65c.64-1.74 3.08-8.32 3.08-8.32l1.6 8.32H9.81z"
        fill="#FFFFFF"
      />
      <path d="M12.45.44L6.9 24.76H.32L12.45.44z" fill="#F7B600" />
    </svg>
  );
}

export function MastercardLogo({ className = "h-4" }: { className?: string }) {
  return (
    <svg viewBox="0 0 38 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <circle cx="12" cy="12" r="12" fill="#EB001B" />
      <circle cx="26" cy="12" r="12" fill="#F79E1B" fillOpacity="0.9" />
      <path
        d="M19 3.57a11.95 11.95 0 00-4.6 8.43 11.95 11.95 0 004.6 8.43 11.95 11.95 0 004.6-8.43A11.95 11.95 0 0019 3.57z"
        fill="#FF5F00"
      />
    </svg>
  );
}

export function EloLogo({ className = "h-4" }: { className?: string }) {
  return (
    <svg viewBox="0 0 100 60" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <rect width="100" height="60" rx="8" fill="#000000" />
      <path d="M22 44V16h8v21.5h11V44H22z" fill="#FFFFFF" />
      <path
        d="M52 30c0-7.8 5.8-14 13.5-14S79 22.2 79 30s-5.8 14-13.5 14S52 37.8 52 30zm18.8 0c0-4.3-2.5-7.5-5.3-7.5s-5.3 3.2-5.3 7.5 2.5 7.5 5.3 7.5 5.3-3.2 5.3-7.5z"
        fill="#00A4E4"
      />
      <circle cx="39" cy="23.5" r="6.5" fill="#E52421" />
      <circle cx="49" cy="36" r="6.5" fill="#FFCC00" />
      <circle cx="59" cy="23.5" r="6.5" fill="#00A4E4" />
    </svg>
  );
}

export function AmexLogo({ className = "h-4" }: { className?: string }) {
  return (
    <svg viewBox="0 0 100 60" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <rect width="100" height="60" rx="8" fill="#006FCF" />
      <path
        d="M16 41l3.9-9.8h6l3.9 9.8h5.7L27 21.5h-8.3L10.2 41H16zm7-14.3l2.1 5.5h-4.2l2.1-5.5zM38 41h5.5v-12l6 12h3.9l6-12v12H65V21.5h-7.3l-6.2 12.5-6.2-12.5H38V41zM70 41h15.6v-4.2h-10.1v-3.4h9.1v-4.2h-9.1v-3.6h10.1V21.5H70V41z"
        fill="#FFFFFF"
      />
    </svg>
  );
}

export function BoletoLogo({ className = "h-4" }: { className?: string }) {
  return (
    <svg viewBox="0 0 38 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <rect width="38" height="24" rx="3" fill="#1F2937" />
      <rect x="6" y="6" width="2" height="12" fill="#FFFFFF" />
      <rect x="9.5" y="6" width="1" height="12" fill="#FFFFFF" />
      <rect x="12" y="6" width="3" height="12" fill="#FFFFFF" />
      <rect x="16.5" y="6" width="1.5" height="12" fill="#FFFFFF" />
      <rect x="19.5" y="6" width="2.5" height="12" fill="#FFFFFF" />
      <rect x="23.5" y="6" width="1" height="12" fill="#FFFFFF" />
      <rect x="26" y="6" width="3" height="12" fill="#FFFFFF" />
      <rect x="30" y="6" width="2" height="12" fill="#FFFFFF" />
    </svg>
  );
}

export function PaymentBadges({ showAmex = true }: { showAmex?: boolean }) {
  return (
    <div className="flex flex-wrap items-center justify-center gap-2">
      <div
        className="flex h-8 items-center justify-center rounded-lg border border-border bg-background-tertiary px-2.5 py-1 transition-all hover:border-primary/40 hover:bg-background"
        title="Pix - Pagamento instantâneo"
      >
        <PixLogo className="h-5 w-auto" />
      </div>

      <div
        className="flex h-8 items-center justify-center rounded-lg border border-border bg-background-tertiary px-2.5 py-1 transition-all hover:border-primary/40 hover:bg-background"
        title="Cartão Visa"
      >
        <VisaLogo className="h-4 w-auto" />
      </div>

      <div
        className="flex h-8 items-center justify-center rounded-lg border border-border bg-background-tertiary px-2.5 py-1 transition-all hover:border-primary/40 hover:bg-background"
        title="Cartão Mastercard"
      >
        <MastercardLogo className="h-5 w-auto" />
      </div>

      <div
        className="flex h-8 items-center justify-center rounded-lg border border-border bg-background-tertiary px-2.5 py-1 transition-all hover:border-primary/40 hover:bg-background"
        title="Cartão Elo"
      >
        <EloLogo className="h-5 w-auto" />
      </div>

      {showAmex ? (
        <div
          className="flex h-8 items-center justify-center rounded-lg border border-border bg-background-tertiary px-2.5 py-1 transition-all hover:border-primary/40 hover:bg-background"
          title="Cartão American Express"
        >
          <AmexLogo className="h-5 w-auto" />
        </div>
      ) : null}

      <div
        className="flex h-8 items-center justify-center rounded-lg border border-border bg-background-tertiary px-2.5 py-1 transition-all hover:border-primary/40 hover:bg-background"
        title="Boleto bancário"
      >
        <BoletoLogo className="h-5 w-auto" />
      </div>
    </div>
  );
}
