import type { User, Role } from "$lib/user";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  Firestore,
  getDoc,
  getDocs,
  query,
  updateDoc,
  where,
  type DocumentData,
} from "firebase/firestore";
import { db } from "../firebase";

export class UserService {
  constructor() {}

  private usersRef = collection(db, "users");

  async getUsers(): Promise<User[]> {
    const querySnapshot = await getDocs(this.usersRef);
    return querySnapshot.docs.map(
      (doc) => ({ id: doc.id, ...doc.data() }) as User
    );
  }

  async createUser(name: string, surname: string, role: Role): Promise<User> {
    const docRef = await addDoc(this.usersRef, {
      name,
      surname,
      role,
    });
    const docSnap = await getDoc(docRef);
    return { id: docSnap.id, ...docSnap.data() } as User;
  }

  async getUserById(userId: string): Promise<User | null> {
    const docRef = doc(this.usersRef, userId);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      return { id: docSnap.id, ...docSnap.data() } as User;
    } else {
      return null;
    }
  }

  async updateUser(userId: string, updates: Partial<User>): Promise<User> {
    const userDoc = doc(this.usersRef, userId);
    const currentData = (await getDoc(userDoc)).data();

    if (currentData) {
      const updatedData = { ...currentData, ...updates };
      await updateDoc(userDoc, updatedData);
      const updatedSnap = await getDoc(userDoc);
      return { id: updatedSnap.id, ...updatedSnap.data() } as User;
    } else {
      throw new Error("User not found");
    }
  }

  async deleteUser(userId: string): Promise<void> {
    const userDoc = doc(this.usersRef, userId);
    await deleteDoc(userDoc);
  }

  async getUserByNameAndSurname(name: string, surname: string): Promise<User | null> {
    const q = query(this.usersRef, where("name", "==", name), where("surname", "==", surname));
    const querySnapshot = await getDocs(q);

    if (querySnapshot.empty) {
      return null;
    }

    const doc = querySnapshot.docs[0]; // Zakładamy, że nazwa i nazwisko są unikalne
    const data = doc.data();
    
    return {
      id: doc.id,
      name: data.name,
      surname: data.surname,
      role: data.role
    } as User;
  }

  /*
  async getUserByGoogleToken(token: any){

    const googleToken = JSON.parse(token)
    const email = token;
    const q = query(this.usersRef, where("email", "==", email))
    const querySnapshot = await getDocs(q);

    if (querySnapshot.empty) {
      return null;
    }
    const doc = querySnapshot.docs[0]; 
    const data = doc.data();

    return {
      id: doc.id,
      name: data.name,
      surname: data.surname,
      role: data.role
    } as User;

  }
  */


  async getUserByEmail(email: string) {
    const q = query(this.usersRef, where("email", "==", email));
    const querySnapshot = await getDocs(q);
    
    //console.log("Query snapshot:", querySnapshot);
    
    if (querySnapshot.empty) {
      console.log("No documents found for email:", email);
      return null;
    }
  
    const doc = querySnapshot.docs[0];
    if (!doc) {
      console.log("Document is undefined");
      return null;
    }

    const data = doc.data();
    if (!data) {
      console.log("Document data is undefined");
      return null;
    }

    console.log("Document data:", data);

    console.log('=========before return============');

    return {
      id: doc.id,
      name: data.name,
      surname: data.surname,
      role: data.role
    } as User;
  }

}
