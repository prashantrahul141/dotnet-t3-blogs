import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import useSWRMutation from "swr/mutation";
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
import { API_URLS } from "~/lib/consts";
import { useToast } from "../ui/use-toast";

const responseSchema = z.object({
  accessToken: z.string(),
  expiresIn: z.number(),
  refreshToken: z.string(),
});

const formSchema = z.object({
  email: z.string().email(),
  password: z.string().min(2).max(18),
});

async function loginUser(
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

  if (res.status === 200) {
    const resJson = await res.json();
    const parsed = await responseSchema.safeParseAsync(resJson);
    if (parsed.success) {
      sessionStorage.setItem("accessToken", parsed.data.accessToken);
      sessionStorage.setItem("refreshToken", parsed.data.refreshToken);
    }
  }

  return res.status === 200;
}

const LoginForm = () => {
  const router = useRouter();
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const { trigger, isMutating } = useSWRMutation(
    API_URLS.Auth.Login(),
    loginUser,
    {},
  );

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    const success = await trigger(values);
    if (success) {
      router.push("/");
    } else {
      toast({
        title: "Unable to login",
        description: "Email or password did not match.",
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
                <Input placeholder="Cisurp@email.com" {...field} />
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
          Login
        </Button>
      </form>
    </Form>
  );
};
export default LoginForm;
