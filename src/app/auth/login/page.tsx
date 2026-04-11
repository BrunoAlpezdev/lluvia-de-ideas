"use client";

import { createClient } from "@/lib/supabase/client";
import { GoogleIcon } from "@/components/atoms/google-icon";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
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
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-indigo-100">
            <Lightbulb className="h-8 w-8 text-indigo-600" />
          </div>
          <CardTitle className="text-2xl font-bold">Lluvia de Ideas</CardTitle>
          <CardDescription>
            Tu gestor de ideas y planes de negocio
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Button
            variant="outline"
            className="w-full gap-2"
            onClick={handleGoogleLogin}
          >
            <GoogleIcon />
            Iniciar sesion con Google
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
