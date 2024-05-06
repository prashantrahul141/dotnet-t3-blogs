import { API_URLS } from "~/lib/consts";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { LoadingSpinner } from "../ui/spinner";

const NonAuthGuard = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  const [success, setSuccess] = useState(false);

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
        setSuccess(res.status !== 200);
        if (res.status === 200) {
          router.push("/");
        }
      })
      .then(() => {});
  }, []);

  if (!success) {
    return (
      <div className="flex h-screen w-full items-center justify-center">
        <LoadingSpinner></LoadingSpinner>
      </div>
    );
  }

  return <>{children}</>;
};

export default NonAuthGuard;
