import { model, Schema, Types } from "mongoose";

const taskSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    owner: {
      type: Types.ObjectId,
      ref: "User",
      required: true,
    },
    tags: [
      {
        type: Types.ObjectId,
        ref: "Tag",
        required: true,
      },
    ],
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true },
);

export const TaskModel = model("Task", taskSchema);
