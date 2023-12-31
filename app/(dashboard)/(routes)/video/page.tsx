"use client";
import * as z from "zod";
import React, { useState } from "react";
import axios from "axios";
import { Heading } from "@/components/Heading";
import { MessageSquare, Music, VideoIcon } from "lucide-react";
import { useForm } from "react-hook-form";
import { formSchema } from "./constants";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormField, FormItem, FormControl } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { Loader } from "@/components/Loader";
import Empty from "@/components/Empty";
import { useProModal } from "@/hooks/use-pro-modal";
import toast from "react-hot-toast";
import { useUser } from '@clerk/nextjs';
import { URL } from "@/app/constants";

const VideoPage = () => {
  const router = useRouter();
  const [video, setVideo] = useState<string>();
  const proModal = useProModal();
  const { user } = useUser();
  const userId = user?.id; // Now you have the userId on the client sid

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      prompt: "",
    },
  });

  const isLoading = form.formState.isSubmitting;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    console.log(values);
    try {
      setVideo(undefined)
      const response = await axios.post(`${URL}/api/video` , {...values , userId : userId});
      setVideo(response.data.data[0])
      form.reset();
    } catch (Err: any) {
      if(Err?.response?.status === 403){
        proModal.onOpen();
      }else{
        toast.error("Something went wrong")
      }
    } finally {
      router.refresh();
    }
  };
  return (
    <div>
      <Heading
        title="Video Generation "
        description="Turn your prompt into video"
        icon={VideoIcon}
        iconColor="text-orange-700"
        bgColor="bg-orange-700/10"
      />
      <div className="px-4 lg:px-8">
        <div>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="rounded-lg border w-full p-4 px-3 md:px-6 focus-within:shadow-sm grid grid-cols-12 gap-2"
            >
              <FormField
                name="prompt"
                render={({ field }) => (
                  <FormItem className="col-span-12 lg:col-span-10 ">
                    <FormControl className="m-0 p-0">
                      <Input
                        className="border-0 outline-none focus-visible:ring-0 focus-visible:ring-transparent"
                        disabled={isLoading}
                        placeholder="Dancing on Moon!!"
                        {...field}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              <Button
                className="col-span-12 lg:col-span-2 w-full"
                disabled={isLoading}
              >
                Generate
              </Button>
            </form>
          </Form>
        </div>
        <div className="space-y-4 mt-4">
          {isLoading && (
            <div className="p-8 rounded-lg w-full flex items-center justify-center bg-muted">
              <Loader />
            </div>
          )}
          {!video && !isLoading && (
            <div>
              <Empty label="No Video started" />
            </div>
          )}
          {
            video && (
              <video controls className="w-full aspect-video mt-8 rounded-lg border">
                <source src={video} /> 
              </video>
            )
          }
        </div>
      </div>
    </div>
  );
};

export default VideoPage;
