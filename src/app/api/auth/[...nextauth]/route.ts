import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../../../../firebase/initFirebase";
import { authOptions } from "@src/helpers/auth";

const handler = NextAuth(authOptions)
export { handler as GET, handler as POST }

