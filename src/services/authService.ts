import { 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword,
  signOut,
  updateProfile
} from 'firebase/auth';
import { auth, db } from '../config/firebase';
import { LoginCredentials, RegisterCredentials, User } from '../types/auth';

export const authService = {
  async login({ email, password }: LoginCredentials): Promise<User> {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      return {
        id: userCredential.user.uid,
        email: userCredential.user.email!,
        displayName: userCredential.user.displayName || null,
        photoURL: userCredential.user.photoURL || null
      };
    } catch (error: any) {
      throw new Error(error.message);
    }
  },

  async register({ email, password, displayName }: RegisterCredentials): Promise<User> {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      
      if (displayName) {
        await updateProfile(userCredential.user, { displayName });
      }

      return {
        id: userCredential.user.uid,
        email: userCredential.user.email!,
        displayName: displayName || null,
        photoURL: userCredential.user.photoURL || null
      };
    } catch (error: any) {
      throw new Error(error.message);
    }
  },

  async logout(): Promise<void> {
    try {
      await signOut(auth);
    } catch (error: any) {
      throw new Error(error.message);
    }
  }
}; 