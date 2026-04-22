"use server";

import { randomUUID } from "node:crypto";
import { revalidatePath } from "next/cache";
import { Timestamp } from "firebase-admin/firestore";
import { adminFirestore } from "@/lib/firebase/admin";
import { getCurrentUser } from "@/lib/firebase/session";
import type { IdeaFormFields, IdeaUpdate } from "@/lib/types/database";

export type ActionResult<T = void> =
  | ({ ok: true } & (T extends void ? object : { data: T }))
  | { ok: false; error: string };

export async function createIdea(
  input: IdeaFormFields,
): Promise<ActionResult<{ id: string }>> {
  const user = await getCurrentUser();
  if (!user) return { ok: false, error: "No hay sesión activa" };

  if (!input.nombre?.trim() || !input.idea?.trim()) {
    return { ok: false, error: "Nombre e Idea son obligatorios" };
  }

  const id = randomUUID();
  const now = Timestamp.now();

  try {
    await adminFirestore
      .collection("ideas")
      .doc(id)
      .set({
        ...input,
        id,
        user_id: user.uid,
        user_name: (user.name as string) ?? null,
        user_avatar_url: user.picture ?? null,
        created_at: now,
        updated_at: now,
      });
    revalidatePath("/ideas");
    revalidatePath("/dashboard");
    return { ok: true, data: { id } };
  } catch (e) {
    const message = e instanceof Error ? e.message : "Error desconocido";
    return { ok: false, error: `Firestore: ${message}` };
  }
}

export async function updateIdea(
  id: string,
  input: IdeaUpdate,
): Promise<ActionResult> {
  const user = await getCurrentUser();
  if (!user) return { ok: false, error: "No hay sesión activa" };

  try {
    await adminFirestore
      .collection("ideas")
      .doc(id)
      .update({ ...input, updated_at: Timestamp.now() });
    revalidatePath("/ideas");
    revalidatePath(`/ideas/${id}`);
    revalidatePath("/dashboard");
    return { ok: true };
  } catch (e) {
    const message = e instanceof Error ? e.message : "Error desconocido";
    return { ok: false, error: `Firestore: ${message}` };
  }
}

export async function deleteIdea(id: string): Promise<ActionResult> {
  const user = await getCurrentUser();
  if (!user) return { ok: false, error: "No hay sesión activa" };

  try {
    await adminFirestore.collection("ideas").doc(id).delete();
    revalidatePath("/ideas");
    revalidatePath("/dashboard");
    return { ok: true };
  } catch (e) {
    const message = e instanceof Error ? e.message : "Error desconocido";
    return { ok: false, error: `Firestore: ${message}` };
  }
}
