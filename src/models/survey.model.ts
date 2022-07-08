import { model, Schema, Types } from "mongoose";

export interface ISurvey {
    title: string;
    comment: string;
    questions: Types.ObjectId[]
  }
  
  const schema = new Schema<ISurvey>({
    title: {type:String},
    comment: {type:String},
    questions: [{ type: Schema.Types.ObjectId, ref: 'Question' }],
  });
  
  export default model<ISurvey>("Survey", schema);
  