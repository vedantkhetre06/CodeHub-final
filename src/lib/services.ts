
import { 
  collection, 
  doc, 
  getDoc, 
  getDocs, 
  setDoc, 
  addDoc, 
  query, 
  where, 
  orderBy,
  Timestamp 
} from "firebase/firestore";
import { db } from "./firebase";
import { User, Test, Assignment, Submission, Subject } from "./types";

/**
 * User Services
 */
export async function getUserProfile(uid: string): Promise<User | null> {
  const docRef = doc(db, "users", uid);
  const docSnap = await getDoc(docRef);
  return docSnap.exists() ? (docSnap.data() as User) : null;
}

export async function createUserProfile(uid: string, profile: User) {
  await setDoc(doc(db, "users", uid), profile);
}

/**
 * Test Services
 */
export async function getAllTests(): Promise<Test[]> {
  const q = query(collection(db, "tests"), orderBy("createdAt", "desc"));
  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Test));
}

export async function getTestById(id: string): Promise<Test | null> {
  const docRef = doc(db, "tests", id);
  const docSnap = await getDoc(docRef);
  return docSnap.exists() ? ({ id: docSnap.id, ...docSnap.data() } as Test) : null;
}

export async function createTest(test: Omit<Test, 'id'>) {
  return await addDoc(collection(db, "tests"), {
    ...test,
    createdAt: Timestamp.now().toDate().toISOString()
  });
}

/**
 * Assignment Services
 */
export async function getAssignments(): Promise<Assignment[]> {
  const q = query(collection(db, "assignments"), orderBy("dueDate", "asc"));
  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Assignment));
}

/**
 * Submission Services
 */
export async function submitTestResult(submission: Omit<Submission, 'id'>) {
  return await addDoc(collection(db, "submissions"), {
    ...submission,
    submittedAt: Timestamp.now().toDate().toISOString()
  });
}

export async function getSubmissionsByStudent(studentId: string): Promise<Submission[]> {
  const q = query(collection(db, "submissions"), where("studentId", "==", studentId), orderBy("submittedAt", "desc"));
  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Submission));
}

export async function getSubmissionsByTest(testId: string): Promise<Submission[]> {
  const q = query(collection(db, "submissions"), where("testId", "==", testId), orderBy("submittedAt", "desc"));
  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Submission));
}
