import { users, type User, type InsertUser, type UpdateProfile } from "@shared/schema";
import { db } from "./db";
import { eq } from "drizzle-orm";
import session from "express-session";
import connectPg from "connect-pg-simple";
import { pool } from "./db";

const PostgresSessionStore = connectPg(session);

export interface IStorage {
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  updateProfile(id: number, profile: UpdateProfile): Promise<User>;
  sessionStore: session.SessionStore;
}

export class DatabaseStorage implements IStorage {
  sessionStore: session.SessionStore;

  constructor() {
    this.sessionStore = new PostgresSessionStore({
      pool,
      createTableIfMissing: true,
    });
  }

  async getUser(id: number): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user;
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.username, username));
    return user;
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const [user] = await db
      .insert(users)
      .values({
        ...insertUser,
        onboardingStatus: "pending",
        additionalInfo: {},
      })
      .returning();
    return user;
  }

  async updateProfile(id: number, profile: UpdateProfile): Promise<User> {
    const [user] = await db
      .update(users)
      .set(profile)
      .where(eq(users.id, id))
      .returning();

    if (!user) throw new Error("User not found");
    return user;
  }
}

export const storage = new DatabaseStorage();