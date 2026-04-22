import { Timestamp } from "firebase-admin/firestore";
import { adminFirestore } from "./admin";
import type { Idea } from "@/lib/types/database";

function serializeIdea(doc: FirebaseFirestore.DocumentSnapshot): Idea {
  const data = doc.data();
  if (!data) throw new Error(`Idea ${doc.id} has no data`);

  const out: Record<string, unknown> = { id: doc.id };
  for (const [key, value] of Object.entries(data)) {
    if (key === "id") continue;
    out[key] =
      value instanceof Timestamp ? value.toDate().toISOString() : value;
  }
  return out as Idea;
}

export async function getAllIdeas(): Promise<Idea[]> {
  const snap = await adminFirestore
    .collection("ideas")
    .orderBy("created_at", "desc")
    .get();
  return snap.docs.map(serializeIdea);
}

export async function getIdeaById(id: string): Promise<Idea | null> {
  const doc = await adminFirestore.collection("ideas").doc(id).get();
  if (!doc.exists) return null;
  return serializeIdea(doc);
}
