import { 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
import { auth, db } from "./firebase-config.js";
import { 
  doc, 
  setDoc, 
  getDoc,
  updateDoc,
  collection,
  getDocs,
  query,
  orderBy
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

const INITIAL_XP = 0;
const INITIAL_ECO_POINTS = 0;
const INITIAL_LEVEL = 1;

export async function signUp(email, password, displayName = null) {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    const defaultDisplayName = displayName || user.email.split("@")[0];
    const currentTimestamp = new Date().toISOString();
    
    await setDoc(doc(db, "users", user.uid), {
      email: user.email,
      displayName: defaultDisplayName,
      xp: INITIAL_XP,
      ecoPoints: INITIAL_ECO_POINTS,
      level: INITIAL_LEVEL,
      badges: [],
      missionsCompleted: 0,
      completedQuests: [],
      lastQuestResetTime: currentTimestamp,
      currentDailyQuests: [],
      dailyQuestsCompleted: [],
      questCompletionCount: {},
      questStartTimes: {},
      dailyQuestCompletions: {},
      lastQuestCompletionTime: null,
      plants: [],
      bestRank: null,
      allQuestsCompleted: false,
      allQuestsCompletedCount: 0,
      allQuestsCompletedDate: null,
      createdAt: currentTimestamp
    });
    
    return { success: true, user };
  } catch (error) {
    console.error("Sign up error:", error);
    const errorMessage = error.code || error.message || "Failed to create account";
    return { success: false, error: errorMessage };
  }
}

export async function signIn(email, password) {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    return { success: true, user: userCredential.user };
  } catch (error) {
    console.error("Sign in error:", error);
    // Return the full error object so formatErrorMessage can access error.code
    return { success: false, error: error };
  }
}

export async function logOut() {
  try {
    await signOut(auth);
    return { success: true };
  } catch (error) {
    console.error("Sign out error:", error);
    return { success: false, error: error.message };
  }
}

export function getCurrentUser() {
  return auth.currentUser;
}

export function onAuthChange(callback) {
  return onAuthStateChanged(auth, callback);
}

export async function getUserProfile(userId) {
  try {
    const userDoc = await getDoc(doc(db, "users", userId));
    if (userDoc.exists()) {
      return { success: true, data: userDoc.data() };
    } else {
      return { success: false, error: "User profile not found" };
    }
  } catch (error) {
    console.error("Get user profile error:", error);
    return { success: false, error: error.message };
  }
}

export async function updateUserProfile(userId, updates) {
  try {
    await updateDoc(doc(db, "users", userId), updates);
    return { success: true };
  } catch (error) {
    console.error("Update user profile error:", error);
    return { success: false, error: error.message };
  }
}

export async function getAllUsers() {
  try {
    const usersRef = collection(db, "users");
    const q = query(usersRef, orderBy("xp", "desc"));
    const querySnapshot = await getDocs(q);
    
    const users = [];
    querySnapshot.forEach((doc) => {
      const userData = doc.data();
      users.push({
        id: doc.id,
        ...userData
      });
    });
    
    return { success: true, data: users };
  } catch (error) {
    console.error("Get all users error:", error);
    return { success: false, error: error.message };
  }
}

