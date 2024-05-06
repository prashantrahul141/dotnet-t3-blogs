import { API_URLS } from "~/lib/consts";
import { ZBlogArray, type TBlog } from "~/types";
import useSWR from "swr";
import { LoadingSpinner } from "../ui/spinner";
import BlogCard from "./BlogCard";
import ErrorLabel from "../common/ErrorLabel";
import { ScrollArea } from "../ui/scroll-area";

const fetcher = (endpoint: string) => fetch(endpoint).then((res) => res.json());

const BlogList = () => {
  const { data, error, isLoading } = useSWR<TBlog[]>(
    API_URLS.Blog.GetAll(),
    fetcher,
  );

  if (isLoading) {
    return <LoadingSpinner></LoadingSpinner>;
  }

  const validated = ZBlogArray.safeParse(data);

  if (!validated.success || error) {
    return (
      <div className="w-full text-center">
        <ErrorLabel message="Failed to retrieve blogs, please try again." />
      </div>
    );
  }

  return (
    <ScrollArea className="w-full">
      <div className="mx-auto w-full max-w-xl gap-2">
        {validated.data.map((blog) => {
          return (
            <article key={blog.id} className="py-2">
              <BlogCard reblogData={blog}></BlogCard>
            </article>
          );
        })}
      </div>
    </ScrollArea>
  );
};

export default BlogList;
