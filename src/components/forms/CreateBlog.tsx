import useSWRMutation from "swr/mutation";
import { API_URLS } from "~/lib/consts";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";
import { TBlog, ZBlog } from "~/types";
import { useRouter } from "next/router";
import { useToast } from "../ui/use-toast";

const formSchema = z.object({
  title: z.string().min(2).max(60),
  body: z.string().min(10),
});

type resp = { success: true; data: TBlog } | { success: false };

const createNewPost = async (
  url: string,
  { arg }: { arg: z.infer<typeof formSchema> },
): Promise<resp> => {
  const res = await fetch(url, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${sessionStorage.getItem("accessToken")}`,
    },
    body: JSON.stringify(arg),
  });

  if (res.status !== 201) {
    return { success: false };
  } else {
    return { success: true, data: await ZBlog.parseAsync(await res.json()) };
  }
};

const CreateBlogForm = () => {
  const router = useRouter();
  const { toast } = useToast();

  const { trigger, isMutating } = useSWRMutation(
    API_URLS.Blog.CreateNew(),
    createNewPost,
    {},
  );

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      body: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    const value = await trigger(values);
    console.log(value);
    if (value.success) {
      void router.push(`/blog/${value.data.id}`);
      return;
    }

    toast({
      title: "Failed to post.",
      description: "Server failed to create a new post, please try again.",
    });
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="mx-auto max-w-lg space-y-8"
      >
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-primary">Title</FormLabel>
              <FormControl>
                <Input
                  placeholder="An amazing title"
                  {...field}
                  className="text-primary"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="body"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-primary">Body</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Your thoughts and ideas"
                  className="text-primary"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button disabled={isMutating} type="submit" className="rounded-lg">
          Post
        </Button>
      </form>
    </Form>
  );
};
export default CreateBlogForm;
