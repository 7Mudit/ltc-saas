import {auth , currentUser} from '@clerk/nextjs'
import { NextResponse } from 'next/server'
import { UserSubscription } from '@/lib/models/UserSubscription'
import { stripe } from '@/lib/stripe'
import { absoluteUrl } from '@/lib/utils'

const settingsUrl = absoluteUrl('/settings')

export async function GET() {
    try{
        const {userId} = auth()
        const user = await currentUser()

        if(!userId || !user){
            return new NextResponse("Unauthorized" , {status : 401})
        }

        const userSubscription = await UserSubscription.findOne({userId : userId})
        if(userSubscription && userSubscription.stripeCustomerId){
            const stripeSession = await stripe.billingPortal.sessions.create({
                customer : userSubscription.stripeCustomerId , 
                return_url : settingsUrl
            })
            return new NextResponse(JSON.stringify({ url: stripeSession.url }));
        }

        const stripeSession = await stripe.checkout.sessions.create({
            success_url : settingsUrl , 
            cancel_url : settingsUrl , 
            payment_method_types : ["card"],
            mode : "subscription" , 
            billing_address_collection : "auto" ,
            customer_email : user.emailAddresses[0].emailAddress,
            line_items : [
                {
                    price_data : {
                        currency : "INR" ,
                        product_data : {
                            name : "LTC Pro" , 
                            description : "Use our AI"
                        },
                        unit_amount : 1000*100,
                        recurring : {
                            interval : "month"
                        }
                    },
                    quantity : 1 
                }
            ],
            metadata : {
                userId
            }
        })

        return new NextResponse(JSON.stringify({ url: stripeSession.url }));

    }
    catch(err){
        console.log("STRIPE ERROR",err)
        return new NextResponse("Internal error" , {status : 500})

    }
}