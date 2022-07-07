import { model, Schema, Types } from "mongoose";

export interface IQuestion {
    type: string;
    // id: string;
    title?: string;
    isRequired: boolean;
    comment?: string;
    content?: any;
  }
  
  const schema = new Schema<IQuestion>({
    // id: {type:String},
    type:{type:String},
    title: {type:String},
    isRequired: {type:Boolean},
    comment:{type: String},
    content:{type: Object},
  });
  
  export default model<IQuestion>("Question", schema);
  