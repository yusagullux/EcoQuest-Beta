// Autentimise vahik – suunab loginni kui kasutaja pole tuvastatud
import { onAuthChange } from "./auth.js";

export function requireAuth() {
  return new Promise((resolve, reject) => {
    onAuthChange((user) => {
      if (user) {
        resolve(user);
      } else {
        // Suunab kasutaja sisselogimise lehele
        window.location.href = "login.html";
        reject(new Error("User not authenticated"));
      }
    });
  });
}

