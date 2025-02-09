import { pgTable, text, serial, boolean, json } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
  profilePicture: text("profile_picture"),
  signature: text("signature"),
  firstName: text("first_name"),
  lastName: text("last_name"),
  email: text("email"),
  phone: text("phone"),
  address: text("address"),
  employer: text("employer"),
  position: text("position"),
  onboardingStatus: text("onboarding_status").default("pending"),
  additionalInfo: json("additional_info").$type<Record<string, any>>(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export const updateProfileSchema = createInsertSchema(users)
  .omit({ id: true, password: true })
  .partial();

export type InsertUser = z.infer<typeof insertUserSchema>;
export type UpdateProfile = z.infer<typeof updateProfileSchema>;
export type User = typeof users.$inferSelect;
