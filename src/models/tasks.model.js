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
    //mi relacion de 1:N de usuario con tareas
    owner: {
      type: Types.ObjectId,
      ref: "User",
      required: true,
    },
    //mi realcion de N:M de tareas con etiqueta
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
