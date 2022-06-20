import mongoose from "mongoose";


const Schema = mongoose.Schema
const ObjectId = Schema.Types.ObjectId

export const AlbumMemberSchema = new Schema ({
accountId: { type: ObjectId, required: true, ref: 'Account'},
albumId: { type: ObjectId, required: true, ref: 'Album'}
},
{timestamps: true, toJSON: {virtuals:true}}
)

AlbumMemberSchema.virtual('album',{
  localField: 'accountId',
  ref:'Account',
  foreignField:'_id',
  justOne: true
})