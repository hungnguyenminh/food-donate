import { authFirebase } from '@/firebase/config';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from '@firebase/auth';

async function signIn(email: string, password: string) {
  let result = null;
  let error = null;
  try {
    result = await signInWithEmailAndPassword(authFirebase, email, password);
  } catch (e) {
    error = e;
  }

  return { result, error };
}

async function signUp(email: string, password: string) {
  let result = null;
  let error = null;
  try {
    result = await createUserWithEmailAndPassword(
      authFirebase,
      email,
      password
    );
  } catch (e) {
    error = e;
  }

  return { result, error };
}

export { signUp, signIn };
