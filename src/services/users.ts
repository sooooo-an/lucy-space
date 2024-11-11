import { auth } from "@/lib/firebase";
import { LoginInputData, SignupInputData } from "@/types/auth";
import { ResponseError } from "@/utils/ResponseError";
import { FirebaseError } from "firebase/app";
import {
  NextOrObserver,
  User,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
} from "firebase/auth";

export const handleLogin = async ({
  email,
  password,
}: LoginInputData): Promise<User> => {
  try {
    const data = await signInWithEmailAndPassword(auth, email, password);

    if (!data) {
      throw new ResponseError({ status: 404, message: "User not found" });
    }

    return data.user;
  } catch (error) {
    console.error("[FIREBASE ERROR] get user FIREBASE AUTH:", error);
    if (error instanceof FirebaseError) {
      const credentialError = error.code === "auth/invalid-credential";
      throw new ResponseError({
        status: credentialError ? 400 : 500,
        message: credentialError
          ? "이메일과 비밀번호가 맞지 않습니다"
          : error.message,
      });
    }
    throw new ResponseError({ status: 500, message: JSON.stringify(error) });
  }
};

export const handleLogout = async () => {
  try {
    return signOut(auth);
  } catch (error) {
    console.error("[FIREBASE ERROR] get user FIREBASE AUTH:", error);
    if (error instanceof FirebaseError) {
      throw new ResponseError({
        status: Number(error.code),
        message: error.message,
      });
    }

    throw new ResponseError({ status: 500, message: JSON.stringify(error) });
  }
};

export const handleAuthState = (fn: NextOrObserver<User>) => {
  return onAuthStateChanged(auth, fn);
};

export const createUser = async (
  { email, password, nickname: displayName }: SignupInputData,
  thumbnail?: string
) => {
  try {
    const { user } = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );

    const randomNumber = Math.floor(Math.random() * 9) + 1;
    const photoURL =
      thumbnail ||
      `${process.env.NEXT_PUBLIC_RANDOM_THUMBNAIL_URL}/thumbnail${randomNumber}.png`;
    await updateProfile(user, {
      photoURL,
      displayName,
    });

    return { ...user, photoURL, displayName };
  } catch (error) {
    console.error("[FIREBASE ERROR] get user FIREBASE AUTH:", error);
    if (error instanceof FirebaseError) {
      throw new ResponseError({
        status: Number(error.code),
        message: error.message,
      });
    }

    throw new ResponseError({ status: 500, message: JSON.stringify(error) });
  }
};
