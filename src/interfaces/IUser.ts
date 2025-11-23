import type { Document } from "mongoose";

export interface IUser extends Document {
  name: string | null;
  lastname: string | null;
  email: string | null;
  password: string | null;
  createdAt: Date | null;
  updatedAt: Date | null;
  deletedAt: Date | null;
}
