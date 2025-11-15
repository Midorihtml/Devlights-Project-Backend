import mongoose, { Schema, Document } from "mongoose";

export interface IUser extends Document {
  name: string | null;
  lastname: string | null;
  email: string | null;
  password: string | null;
}

const UserSchema = new Schema<IUser>({
  name: { type: String, required: true },
  lastname: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String },
});

export const User = mongoose.model<IUser>("User", UserSchema);
