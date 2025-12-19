import mongoose, { Schema } from "mongoose";
import type { IUser } from "../interfaces/IUser.js";
import { Roles } from "../enums/Roles.js";

const UserSchema = new Schema<IUser>(
  {
    name: { type: String, required: true },
    lastname: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String },
    role: { type: String, required: true, default: Roles.CUSTOMER },
    deletedAt: { type: Date, default: null },
  },
  { timestamps: true },
);

export const User = mongoose.model<IUser>("User", UserSchema);
