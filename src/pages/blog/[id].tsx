import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import useSWR from "swr";
import BlogCard from "~/components/Blogs/BlogCard";
import ErrorLabel from "~/components/common/ErrorLabel";
import { LoadingSpinner } from "~/components/ui/spinner";
import { API_URLS } from "~/lib/consts";
import { filterQueryParameter } from "~/lib/utils";
import { TBlog, ZBlog } from "~/types";

const fetcher = (endpoint: string) => fetch(endpoint).then((res) => res.json());

const BlogByIdPage = () => {
  const router = useRouter();
  const { id } = router.query;
  const [mounted, setMounted] = useState(false);

  const { data, error, isLoading } = useSWR<TBlog>(
    mounted ? API_URLS.Blog.GetBlogByBlogId(filterQueryParameter(id)) : null,
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

  const validated = ZBlog.safeParse(data);

  if (error || !validated.success) {
    return (
      <div className="w-full">
        <div className="mx-auto flex w-fit flex-col gap-12 text-center">
          <ErrorLabel message="Could not find blog"></ErrorLabel>

          <Link href="/">
            <p className="text-white underline">Home</p>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="w-full">
        <div className="mx-auto max-w-2xl">
          <BlogCard reblogData={validated.data} variant="large"></BlogCard>
        </div>
      </div>
    </>
  );
};

export default BlogByIdPage;
