import { Client, Account, ID } from "appwrite";
import appwriteConfig from "@/appwrite.config.json";

// Client-side Appwrite client for authentication
const client = new Client()
  .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT || "https://cloud.appwrite.io/v1")
  .setProject(appwriteConfig.projectId);

const account = new Account(client);

export interface User {
  $id: string;
  email: string;
  name: string;
}

export interface AuthSession {
  user: User | null;
  isLoading: boolean;
  error: string | null;
}

// Login with email and password
export async function login(email: string, password: string): Promise<User> {
  try {
    await account.createEmailPasswordSession(email, password);
    const user = await account.get();
    return {
      $id: user.$id,
      email: user.email,
      name: user.name,
    };
  } catch (error: unknown) {
    const appwriteError = error as { message?: string };
    throw new Error(appwriteError.message || "Login failed");
  }
}

// Logout current session
export async function logout(): Promise<void> {
  try {
    await account.deleteSession("current");
  } catch (error: unknown) {
    const appwriteError = error as { message?: string };
    throw new Error(appwriteError.message || "Logout failed");
  }
}

// Get current user
export async function getCurrentUser(): Promise<User | null> {
  try {
    const user = await account.get();
    return {
      $id: user.$id,
      email: user.email,
      name: user.name,
    };
  } catch {
    return null;
  }
}

// Check if user is authenticated
export async function isAuthenticated(): Promise<boolean> {
  try {
    await account.get();
    return true;
  } catch {
    return false;
  }
}

// Export the account instance for direct use if needed
export { account, client };

