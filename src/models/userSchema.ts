import mongoose, { Schema } from "mongoose";
import type { IUser } from "@src/interfaces/IUser";

const UserSchema = new Schema<IUser>(
  {
    name: { type: String, required: true },
    lastname: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String },
    deletedAt: { type: Date, default: null },
  },
  { timestamps: true },
);

export const User = mongoose.model<IUser>("User", UserSchema);
