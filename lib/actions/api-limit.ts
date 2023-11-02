import { auth } from "@clerk/nextjs";

import { MAX_FREE_COUNTS } from "@/constants";

import { connectToDb } from "../mongoose";
import { UserApiLimit } from "../models/UserApiLimit";

export const increaseApiLimit = async () => {
  await connectToDb();
  const { userId } = auth();
  if (!userId) return;

  let userApiLimit = await UserApiLimit.findOne({ userId: userId });

  if (userApiLimit) {
    userApiLimit.count += 1;
    await userApiLimit.save();
  } else {
    userApiLimit = new UserApiLimit({ userId: userId, count: 1 });
    await userApiLimit.save();
  }
};

export const checkApiLimit = async () => {
  await connectToDb();
  const { userId } = auth();
  if (!userId) return;

  const userApiLimit = await UserApiLimit.findOne({ userId: userId });

  if (!userApiLimit || userApiLimit.count < MAX_FREE_COUNTS) {
    return true;
  } else {
    return false;
  }
};

export const getApiLimitCount = async () => {
  await connectToDb();
  const { userId } = auth();

  if (!userId) {
    return 0;
  }
  const userApiLimit = await UserApiLimit.findOne({ userId: userId });
  if (!userApiLimit) return 0;

  return userApiLimit.count;
};
