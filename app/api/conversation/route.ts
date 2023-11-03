import { checkApiLimit, increaseApiLimit } from "@/lib/actions/api-limit";
import { checkSubscription } from "@/lib/actions/subscription";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";
import OpenAI from "openai";
import { ChatCompletionMessageParam } from "openai/resources/index.mjs";

// const configuration = new Configuration({
//     apiKey : process.env.OPENAI_API_KEY
// })

// const openai = new OpenAIApi(configuration);

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const instructionMessageForConversation: ChatCompletionMessageParam = {
  role: "system",
  content: "You are an AI conversationalist. Help the user with their queries.",
};

export async function POST(req: Request) {
  try {
    const { userId } = auth();
    const body = await req.json();
    const { messages } = body;

    if (!userId) {
      return new NextResponse("Unauthorized ", { status: 401 });
    }
    // if(!configuration.apiKey){
    //     return new NextResponse("Open ai api key not configured" , {status : 500})
    // }

    if (!messages) {
      return new NextResponse("Messages are required", { status: 400 });
    }
    // const completion = await openai.chat.completions.create({

    const freeTrial = await checkApiLimit();
    const isPro = await checkSubscription();

    if (!freeTrial && !isPro) {
      return new NextResponse("Free Trial has expired", { status: 403 });
    }
    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [instructionMessageForConversation, ...messages],
    });
    if (!isPro) await increaseApiLimit();

    return NextResponse.json(response.choices[0].message);
  } catch (err) {
    console.log("Conversation Error", err);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
