import prisma from "@/lib/prisma";
import { LoginInputData, SignupInputData } from "@/types/auth";
import { ResponseError } from "@/utils/ResponseError";
import bcrypt from "bcryptjs";

export const getUser = async ({ name, password }: LoginInputData) => {
  try {
    const user = await prisma.user.findUnique({
      where: {
        name,
      },
    });

    if (!user) {
      throw { status: 404, message: "User not found" } as ResponseError;
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      throw {
        status: 401,
        message: "Invalid email or password",
      } as ResponseError;
    }

    return user;
  } catch (error) {
    console.error("[PRISMA ERROR] get user DB:", error);
    if (error instanceof ResponseError) {
      throw error;
    }

    throw { status: 500, message: error } as ResponseError;
  }
};

export const getUserById = async (id: string) => {
  try {
    const user = await prisma.user.findUnique({
      where: {
        id,
      },
    });

    if (!user) {
      throw { status: 404, message: "User not found" } as ResponseError;
    }

    return user;
  } catch (error) {
    console.error("[PRISMA ERROR] get user by ID DB:", error);
    if (error instanceof ResponseError) {
      throw error;
    }

    throw { status: 500, message: error } as ResponseError;
  }
};

export const createUser = async ({
  name,
  password,
  thumbnail = "https://res.cloudinary.com/dcssz2vax/image/upload/v1730274825/pfouophjvvivesrmxh8k.png",
}: SignupInputData) => {
  try {
    const existingUser = await prisma.user.findUnique({
      where: {
        name,
      },
    });

    if (existingUser) {
      throw { status: 409, message: "User already exists" } as ResponseError;
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: {
        name,
        password: hashedPassword,
        thumbnail,
      },
    });

    return user;
  } catch (error) {
    console.error("[PRISMA ERROR] create user DB:", error);
    if (error instanceof ResponseError) {
      throw error;
    }

    throw { status: 500, message: error } as ResponseError;
  }
};
