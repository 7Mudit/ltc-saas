import { auth } from "@clerk/nextjs";
import { UserSubscription } from "../models/UserSubscription"; // Your Mongoose model for user subscriptions

const DAY_IN_MS = 86_400_000;

export const checkSubscription = async () => {
  const { userId } = auth();

  if (!userId) {
    return false;
  }

  const userSubscription = await UserSubscription.findOne({
    userId: userId
  }).select('stripeSubscriptionId stripeCurrentPeriodEnd stripeCustomerId stripePriceId');

  if (!userSubscription) {
    return false;
  }

  const isValid =
    userSubscription.stripePriceId &&
    new Date(userSubscription.stripeCurrentPeriodEnd).getTime() + DAY_IN_MS > Date.now();

  return !!isValid;
};
