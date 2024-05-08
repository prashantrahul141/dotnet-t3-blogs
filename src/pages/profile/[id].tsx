import { Link } from "lucide-react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import useSWR from "swr";
import PublicUserProfile from "~/components/User/PublicUserProfile";
import ErrorLabel from "~/components/common/ErrorLabel";
import { LoadingSpinner } from "~/components/ui/spinner";
import { API_URLS } from "~/lib/consts";
import { filterQueryParameter } from "~/lib/utils";
import { ZPublicUser, ZUser } from "~/types";

const fetcher = (endpoint: string) => fetch(endpoint).then((res) => res.json());

const ProfileByIdPage = () => {
  const router = useRouter();
  const { id } = router.query;
  const [mounted, setMounted] = useState(false);

  const { data, error, isLoading } = useSWR(
    mounted ? API_URLS.User.GetUserByUsername(filterQueryParameter(id)) : null,
    fetcher,
    {
      revalidateOnMount: true,
    },
  );

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!router.isReady) {
    return <LoadingSpinner></LoadingSpinner>;
  }

  if (isLoading) {
    return <LoadingSpinner></LoadingSpinner>;
  }

  const validated = ZPublicUser.safeParse(data);

  if (error || !validated.success) {
    return (
      <div className="w-full">
        <div className="mx-auto flex w-fit flex-col gap-12 text-center">
          <ErrorLabel message={`Couldn't find user @${id}`}></ErrorLabel>
          <Link href="/">
            <p className="text-white underline">Home</p>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <>
      <PublicUserProfile user={validated.data}></PublicUserProfile>
    </>
  );
};

export default ProfileByIdPage;
