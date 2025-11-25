// Auth guard - redirects to login if user is not authenticated
import { onAuthChange } from "./auth.js";

export function requireAuth() {
  return new Promise((resolve, reject) => {
    onAuthChange((user) => {
      if (user) {
        resolve(user);
      } else {
        // Redirect to login page
        window.location.href = "login.html";
        reject(new Error("User not authenticated"));
      }
    });
  });
}

