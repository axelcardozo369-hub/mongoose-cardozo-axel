import { model, Schema } from "mongoose";
const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    isActive: {
      type: Boolean,
      default: false,
    },
  },
  //para darle el borrado logico
  {
    timestamps: true,
  },
);

export const UserModel = model("User", userSchema);
