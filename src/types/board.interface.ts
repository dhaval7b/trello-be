import { Schema, Document } from "mongoose";

export interface Board{
    title: string;
    createdAt: Date
    UpdatedAt: Date;
    userId: Schema.Types.ObjectId
}

export interface BoardDocument extends Document, Board {

}