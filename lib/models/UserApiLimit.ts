import mongoose from "mongoose"

const userApiLimitSchema = new mongoose.Schema({
    userId: { 
      type: String, 
      unique: true, 
      required: true 
    },
    count: { 
      type: Number, 
      default: 0 
    },
    createdAt: { 
      type: Date, 
      default: Date.now 
    },
    updatedAt: { 
      type: Date, 
      default: Date.now 
    }
  }, { timestamps: true });

export const UserApiLimit = mongoose.model('UserApiLimit', userApiLimitSchema);
