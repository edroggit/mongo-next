import { Schema, model } from "mongoose";

export type User = {
  _id?: string;
  username: string;
  password: string;
};

const UserSchema = new Schema<User>({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

export const UserModel = model<User>("user", UserSchema);
