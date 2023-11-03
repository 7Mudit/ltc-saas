"use client"

import { useEffect } from "react"
import {Crisp} from 'crisp-sdk-web'

export const CrispChat = () => {
    useEffect(() => {
        Crisp.configure("e8c887e1-736d-450c-8899-30739b9bc846")
    },[])


    return null;
}