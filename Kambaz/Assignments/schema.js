import mongoose from "mongoose";

const assignmentSchema = new mongoose.Schema(
  {
    _id: String,
    title: { type: String, required: true },
    course: { type: String, ref: "CourseModel", required: true },
    modules: [String],
    availableFrom: Date,
    dueDate: Date,
    points: { type: Number, default: 100 },
    category: {
      type: String,
      enum: ["Assignment", "Quiz", "Exam", "Project"],
      default: "Assignment",
    },
    description: String,
  },
  { collection: "assignments" }
);

export default assignmentSchema;
