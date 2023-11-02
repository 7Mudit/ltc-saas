import {auth} from '@clerk/nextjs'

import { MAX_FREE_COUNTS } from '@/constants'
import { UserApiLimit } from '../models/UserApiLimit'
import { connectToDb } from '../mongoose'

export const increaseApiLimit = async() => {
    await connectToDb();
    const {userId} = auth()
    if(!userId) return

    let userApiLimit = await UserApiLimit.findOne({userId : userId})

    if(userApiLimit){
        userApiLimit.count += 1;
        await userApiLimit.save()
    }
    else{
        userApiLimit = new UserApiLimit({userId : userId , count : 1});
        await userApiLimit.save()

    }
}

export const checkApiLimit = async() => {
    await connectToDb();
    const {userId} = auth();
    if(!userId) return;

    const userApiLimit = await UserApiLimit.findOne({userId : userId});

    if(!userApiLimit || userApiLimit.count < MAX_FREE_COUNTS){
        return true;
    }
    else{
        return false;
    }
}