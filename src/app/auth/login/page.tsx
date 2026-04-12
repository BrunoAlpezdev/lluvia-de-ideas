"use client";

import { createClient } from "@/lib/supabase/client";
import { GoogleIcon } from "@/components/atoms/google-icon";
import { Lightbulb } from "lucide-react";

export default function LoginPage() {
  const handleGoogleLogin = async () => {
    const supabase = createClient();
    await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${window.location.origin}/auth/callback`,
      },
    });
  };

  return (
    <div className="bg-background relative flex min-h-screen items-center justify-center overflow-hidden p-4">
      {/* Blueprint grid overlay */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage:
            "linear-gradient(rgba(167, 165, 255, 0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(167, 165, 255, 0.05) 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />

      {/* Atmospheric blur orbs */}
      <div className="bg-primary/20 pointer-events-none absolute -top-64 -left-64 h-[600px] w-[600px] rounded-full blur-[120px]" />
      <div className="pointer-events-none absolute -right-64 -bottom-64 h-[600px] w-[600px] rounded-full bg-[#ac8aff]/10 blur-[120px]" />

      {/* Card */}
      <div className="bg-muted relative w-full max-w-md overflow-hidden rounded-xl border border-white/5 p-8 shadow-[0_32px_64px_-12px_rgba(0,0,0,0.6)] md:p-12">
        {/* Gradient accent line */}
        <div className="from-primary to-primary-dim absolute inset-x-0 top-0 h-px bg-gradient-to-r" />

        <div className="flex flex-col items-center text-center">
          {/* Icon circle */}
          <div className="bg-surface-bright mb-8 flex h-16 w-16 items-center justify-center rounded-full border border-white/5 shadow-inner">
            <Lightbulb className="text-primary h-8 w-8" />
          </div>

          {/* Title */}
          <h1 className="font-heading text-primary text-3xl font-bold tracking-tighter">
            Lluvia de Ideas
          </h1>

          {/* Subtitle */}
          <p className="text-muted-foreground mt-2 text-sm leading-relaxed">
            Tu gestor de ideas y planes de negocio
          </p>

          {/* Google sign-in button */}
          <button
            type="button"
            onClick={handleGoogleLogin}
            className="bg-surface-bright text-foreground hover:bg-surface-highest mt-8 flex w-full items-center justify-center gap-3 rounded-lg border border-[#40485d]/30 px-6 py-4 transition-all active:scale-[0.98]"
          >
            <GoogleIcon />
            <span>Iniciar sesión con Google</span>
          </button>

          {/* Footer inside card */}
          <div className="mt-10 flex items-center gap-2">
            <span className="h-1 w-1 rounded-full bg-[#6d758c]" />
            <span className="text-[10px] tracking-[0.2em] text-[#6d758c] uppercase">
              Digital Blueprint System
            </span>
            <span className="h-1 w-1 rounded-full bg-[#6d758c]" />
          </div>
        </div>
      </div>

      {/* Bottom links outside card */}
      <div className="absolute bottom-6 flex gap-6">
        <a
          href="#"
          className="text-muted-foreground/60 hover:text-muted-foreground text-[11px] tracking-widest uppercase transition-colors"
        >
          Términos
        </a>
        <a
          href="#"
          className="text-muted-foreground/60 hover:text-muted-foreground text-[11px] tracking-widest uppercase transition-colors"
        >
          Privacidad
        </a>
        <a
          href="#"
          className="text-muted-foreground/60 hover:text-muted-foreground text-[11px] tracking-widest uppercase transition-colors"
        >
          Ayuda
        </a>
      </div>
    </div>
  );
}
