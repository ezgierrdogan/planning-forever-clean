import {
  collection,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  query,
  where,
  getDocs,
  Timestamp,
  getDoc
} from 'firebase/firestore';
import { db } from '../config/firebase';
import { Task } from '../types/task';

export const taskService = {
  async getTasks(userId: string): Promise<Task[]> {
    try {
      const tasksRef = collection(db, 'tasks');
      const q = query(tasksRef, where('userId', '==', userId));
      const querySnapshot = await getDocs(q);
      
      return querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
        dueDate: doc.data().dueDate?.toDate(),
        createdAt: doc.data().createdAt?.toDate(),
        updatedAt: doc.data().updatedAt?.toDate(),
      })) as Task[];
    } catch (error: any) {
      throw new Error(error.message);
    }
  },

  async getTask(taskId: string): Promise<Task> {
    try {
      const taskRef = doc(db, 'tasks', taskId);
      const taskDoc = await getDoc(taskRef);
      
      if (!taskDoc.exists()) {
        throw new Error('Görev bulunamadı');
      }

      return {
        id: taskDoc.id,
        ...taskDoc.data(),
        dueDate: taskDoc.data()?.dueDate?.toDate(),
        createdAt: taskDoc.data()?.createdAt?.toDate(),
        updatedAt: taskDoc.data()?.updatedAt?.toDate(),
      } as Task;
    } catch (error: any) {
      throw new Error(error.message);
    }
  },

  async createTask(task: Omit<Task, 'id' | 'createdAt' | 'updatedAt'>): Promise<Task> {
    try {
      const now = Timestamp.now();
      const taskData = {
        ...task,
        createdAt: now,
        updatedAt: now,
        dueDate: task.dueDate ? Timestamp.fromDate(task.dueDate) : null,
      };

      const docRef = await addDoc(collection(db, 'tasks'), taskData);
      return {
        id: docRef.id,
        ...task,
        createdAt: now.toDate(),
        updatedAt: now.toDate(),
      };
    } catch (error: any) {
      throw new Error(error.message);
    }
  },

  async updateTask(taskId: string, updates: Partial<Task>): Promise<void> {
    try {
      const taskRef = doc(db, 'tasks', taskId);
      const updateData = {
        ...updates,
        updatedAt: Timestamp.now(),
        dueDate: updates.dueDate ? Timestamp.fromDate(updates.dueDate) : null,
      };
      await updateDoc(taskRef, updateData);
    } catch (error: any) {
      throw new Error(error.message);
    }
  },

  async deleteTask(taskId: string): Promise<void> {
    try {
      const taskRef = doc(db, 'tasks', taskId);
      await deleteDoc(taskRef);
    } catch (error: any) {
      throw new Error(error.message);
    }
  },
}; 