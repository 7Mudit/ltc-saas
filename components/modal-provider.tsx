"use client"

import { useEffect, useState } from "react"
import { ProModal } from "./pro-modal"


export const ModalProvider = () => {
    const [mounted , setIsMounted] = useState(false)

    useEffect(() => {
        setIsMounted(true)
    }, [])

    if(!mounted){
        return null
    }

    return(
        <>
            <ProModal/>
        </>
    )

}
