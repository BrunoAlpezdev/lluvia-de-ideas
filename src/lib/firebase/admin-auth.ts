import {
  cert,
  getApps,
  initializeApp,
  type ServiceAccount,
} from "firebase-admin/app";
import { getAuth } from "firebase-admin/auth";

function loadServiceAccount(): ServiceAccount {
  const raw = process.env.FIREBASE_SERVICE_ACCOUNT_KEY;
  if (!raw) {
    throw new Error(
      "FIREBASE_SERVICE_ACCOUNT_KEY is not set — add the JSON service account to .env.local",
    );
  }
  return JSON.parse(raw) as ServiceAccount;
}

const app = getApps().length
  ? getApps()[0]!
  : initializeApp({ credential: cert(loadServiceAccount()) });

export const adminAuth = getAuth(app);
