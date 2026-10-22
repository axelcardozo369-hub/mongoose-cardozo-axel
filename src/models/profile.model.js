import { model, Schema, Types } from "mongoose";

const profileSchema = new Schema(
  {
    biography: {
      type: String,
      required: true,
    },
    address: {
      city: {
        type: String,
        required: true,
      },
      province: {
        type: String,
        required: true,
      },
    },
    user: {
      type: Types.ObjectId,
      ref: "User",
      required: true,
      unique: true,
    },

    isActive: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true },
);

export const ProfileModel = model("Profile", profileSchema);
