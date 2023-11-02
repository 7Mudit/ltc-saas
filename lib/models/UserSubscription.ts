import mongoose from "mongoose";

const userSubscriptionSchema = new mongoose.Schema({
    userId : {
        type : String ,
        unique : true, 
        required : true
    },
    stripeCustomerId : {
        type : String ,
        unique : true ,
        sparse : true,
    },
    stripeSubscriptionId : {
        type : String ,
        unique : true,
        sparse : true
    },
    stripePriceId : {
        type : String
    },
    stripeCurrentPeriodEnd : {
        type : Date
    }
},{timestamps : true})

// Check if the model exists before trying to compile it
export const UserSubscription = mongoose.models.UserSubscription || mongoose.model('UserSubscription', userSubscriptionSchema);

