import { z } from "zod";

export const usernameSchema = z
  .string()
  .trim()
  .min(1, "username is required.")
  .max(100, "username is too long.")
  .regex(/^[A-Za-z0-9_-]+$/, "username format is invalid.");
