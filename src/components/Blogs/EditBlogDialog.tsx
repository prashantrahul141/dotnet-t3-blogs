import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "~/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "~/components/ui/form";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { TBlog } from "~/types";
import { Dispatch, SetStateAction } from "react";
import { IoCloseSharp } from "react-icons/io5";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Textarea } from "../ui/textarea";

const formSchema = z.object({
  title: z.string().min(5),
  body: z.string().min(5),
});

const EditBlogDialog = ({
  open,
  onOpenChange,
  blogData,
}: {
  open: boolean;
  onOpenChange: Dispatch<SetStateAction<boolean>>;
  blogData: TBlog;
}) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: blogData.title,
      body: blogData.body,
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    console.log(values);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="dark sm:max-w-[425px]">
        <DialogHeader className="relative">
          <DialogClose asChild className="absolute right-0 top-0">
            <Button
              variant={"ghost"}
              className="aspect-square w-fit rounded-full p-0"
            >
              <IoCloseSharp className="text-primary" />
            </Button>
          </DialogClose>
          <DialogTitle className="text-primary">Edit post</DialogTitle>
          <DialogDescription>Make changes to this blog post</DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-primary">Title</FormLabel>
                  <FormControl>
                    <Input
                      className="text-primary"
                      placeholder="An amazing title"
                      {...field}
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
                      className="text-primary"
                      placeholder="Body content"
                      {...field}
                    ></Textarea>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <DialogFooter>
              <Button type="submit">Save changes</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default EditBlogDialog;
