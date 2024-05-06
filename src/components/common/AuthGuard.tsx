import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useUserStore } from "../state/stores";
import { LoadingSpinner } from "../ui/spinner";
import { API_URLS } from "~/lib/consts";
import { ZUser } from "~/types";

const AuthGuard = ({
  children,
  byPassGuard = false,
  redirect = true,
}: {
  children: React.ReactNode;
  byPassGuard: boolean;
  redirect: boolean;
}) => {
  const router = useRouter();
  const [success, setSuccess] = useState(false);
  const userStore = useUserStore((state) => state.updatePerson);

  useEffect(() => {
    const fetcher = async () => {
      return await fetch(API_URLS.User.GetLoggedInUser(), {
        method: "GET",
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${sessionStorage.getItem("TOKEN") ?? ""}`,
        },
      });
    };

    fetcher()
      .then((res) => {
        setSuccess(res.status === 200);
        if (res.status !== 200) {
          if (redirect) {
            router.push("/login");
          }
          return {};
        }
        return res.json();
      })
      // biome-ignore lint/suspicious/noExplicitAny: <explanation>
      .then((data: any) => {
        const parsed = ZUser.safeParse(data);
        userStore({
          name: parsed.success ? parsed.data.name : "",
          userId: parsed.success ? parsed.data.userId : "",
          email: parsed.success ? parsed.data.email : "",
          image: parsed.success ? parsed.data.image : "",
          isLoggedIn: parsed.success,
        });
      });
  }, []);

  if (!success && !byPassGuard) {
    return (
      <div className="flex h-screen w-full items-center justify-center">
        <LoadingSpinner></LoadingSpinner>
      </div>
    );
  }

  return <>{children}</>;
};

export default AuthGuard;
