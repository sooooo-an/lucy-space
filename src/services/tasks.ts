import { db } from "@/lib/firebase";
import { addDoc, collection } from "firebase/firestore";

export const createTask = async (title: string) => {
  const newTask = await addDoc(collection(db, "tasks"), {
    title: "",
  });
};

export const updateTask = () => {};

export const deleteTask = () => {};

// import { db } from '../lib/firebase';
// import { collection, addDoc, setDoc, doc } from 'firebase/firestore';
