import { API_URL } from "~/lib/consts";
import { ZBlogArray, type TBlog } from "~/types";
import useSWR from "swr";
import { LoadingSpinner } from "../ui/spinner";
import BlogCard from "./BlogCard";
import ErrorLabel from "../common/ErrorLabel";

const fetcher = (endpoint: string) => fetch(endpoint).then((res) => res.json());

const BlogList = () => {
  const { data, error, isLoading } = useSWR<TBlog[]>(
    `${API_URL}/api/Blogs/GetAll`,
    fetcher,
  );

  if (isLoading) {
    return <LoadingSpinner></LoadingSpinner>;
  }

  if (error) {
    return <ErrorLabel message="Failed to retrieve blogs, please try again." />;
  }

  const validated = ZBlogArray.safeParse(data);

  if (!validated.success) {
    return <ErrorLabel message="Failed to validate, please try again." />;
  }

  return (
    <div className="flex w-full items-center justify-center">
      <article className="flex w-screen max-w-lg flex-col gap-2">
        {validated.data.map((blog) => {
          return <BlogCard blogData={blog} key={blog.id}></BlogCard>;
        })}
      </article>
    </div>
  );
};

export default BlogList;
