import mongoose, { Document, Schema } from 'mongoose';

export interface IComment extends Document {
  name: string;
  comment: string;
  createdAt: Date;
  updatedAt: Date;
}

const CommentSchema: Schema = new Schema(
  {
    name: {
      type: String,
      required: [true, 'Nome é obrigatório'],
      trim: true,
      maxlength: [100, 'Nome não pode ter mais de 100 caracteres'],
    },
    comment: {
      type: String,
      required: [true, 'Comentário é obrigatório'],
      trim: true,
      maxlength: [1000, 'Comentário não pode ter mais de 1000 caracteres'],
    },
  },
  {
    timestamps: true,
  }
);

// Prevent re-compilation during development
const Comment = mongoose.models.Comment || mongoose.model<IComment>('Comment', CommentSchema);

export default Comment;