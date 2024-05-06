import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "~/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "~/components/ui/form";
import { Input } from "~/components/ui/input";
import useSWRMutation from "swr/mutation";
import { API_URLS } from "~/lib/consts";
import { useToast } from "../ui/use-toast";

const formSchema = z.object({
  email: z.string().email(),
  password: z.string().min(2).max(18),
});

async function registerUser(
  url: string,
  { arg }: { arg: z.infer<typeof formSchema> },
) {
  const res = await fetch(url, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(arg),
  });

  return res.status === 200;
}

const RegisterForm = ({
  setCurrentTab,
}: {
  setCurrentTab: (value: string) => void;
}) => {
  const { toast } = useToast();

  const { trigger, isMutating } = useSWRMutation(
    API_URLS.Auth.Register(),
    registerUser,
    {},
  );

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    const success = await trigger(values);
    if (success) {
      setCurrentTab("login");
      toast({
        title: "Created new account.",
        description: "Created a new account for you, now you can login.",
      });
    } else {
      toast({
        title: "Failed to register",
        description:
          "Unable to create a new account with that email and username.",
      });
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="cisurp@email.com" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input placeholder="Password@123" type="password" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button disabled={isMutating} type="submit" className="rounded-lg">
          Create account
        </Button>
      </form>
    </Form>
  );
};
export default RegisterForm;
