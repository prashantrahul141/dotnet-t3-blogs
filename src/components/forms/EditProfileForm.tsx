import { z } from "zod";
import { TUser, ZUser } from "~/types";
import { useToast } from "../ui/use-toast";
import { API_URLS } from "~/lib/consts";
import useSWRMutation from "swr/mutation";
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
import { Button } from "../ui/button";
import { useUserStore } from "../state/stores";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "~/components/ui/alert-dialog";
import { useState } from "react";

const signOut = () => {
  sessionStorage.removeItem("accessToken");
  sessionStorage.removeItem("refreshToken");
  window.location.reload();
};

const formSchema = z.object({
  username: z.string().min(3).max(50),
  avatar: z.string().url(),
});

type resp = { success: true; data: TUser } | { success: false; error: string };

const UpdateUser = async (
  url: string,
  { arg }: { arg: z.infer<typeof formSchema> },
): Promise<resp> => {
  const res = await fetch(url, {
    method: "PATCH",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${sessionStorage.getItem("accessToken")}`,
    },
    body: JSON.stringify(arg),
  });

  const resJson = await res.json();

  if (res.status !== 202) {
    return { success: false, error: resJson as string };
  } else {
    return { success: true, data: await ZUser.parseAsync(resJson) };
  }
};

const EditProfileForm = ({
  data: { name, image },
}: {
  data: {
    name: string;
    image: string;
  };
}) => {
  const { toast } = useToast();
  const userUpdateFn = useUserStore((state) => state.updatePerson);
  const prevUserState = useUserStore();
  const [openSignOutDialog, setOpenSignOutDialog] = useState(false);

  const { trigger, isMutating } = useSWRMutation(
    API_URLS.User.UpdateUser(),
    UpdateUser,
    {},
  );

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: name,
      avatar: image,
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    const value = await trigger(values);
    if (value.success) {
      userUpdateFn({
        ...prevUserState,
        username: values.username,
        avatar: values.avatar,
      });

      toast({
        description: "Your profile has been updated.",
      });
    } else {
      toast({
        variant: "destructive",
        description: value.error,
      });
    }
  };

  return (
    <>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="mx-auto max-w-lg space-y-2"
        >
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-primary">Username</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Your at"
                    className="min-w-72 text-primary"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="avatar"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-primary">Avatar</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Image url"
                    className="text-primary"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="space-x-4 pt-3">
            <Button disabled={isMutating} type="submit" className="rounded-lg">
              Update
            </Button>

            <Button
              onClick={() => setOpenSignOutDialog(true)}
              disabled={isMutating}
              type="button"
              variant={"destructive"}
            >
              Sign out
            </Button>
          </div>
        </form>
      </Form>

      <AlertDialog open={openSignOutDialog} onOpenChange={setOpenSignOutDialog}>
        <AlertDialogContent className="dark">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-primary">
              Are you sure you want to sign out?
            </AlertDialogTitle>
            <AlertDialogDescription>
              This will sign out your account from this device, and you will
              have to login again to access your account.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel asChild>
              <Button variant={"ghost"} className="text-primary">
                Cancel
              </Button>
            </AlertDialogCancel>
            <AlertDialogAction asChild>
              <Button variant={"destructive"} type="button" onClick={signOut}>
                Sign out
              </Button>
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default EditProfileForm;
