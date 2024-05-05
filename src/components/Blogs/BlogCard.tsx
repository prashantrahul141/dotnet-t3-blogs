import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import type { TBlog } from "~/types";

const BlogCard = ({ blogData }: { blogData: TBlog }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{blogData.title}</CardTitle>
        <CardDescription>{blogData.userName}</CardDescription>
      </CardHeader>
      <CardContent>
        <p>{blogData.body}</p>
      </CardContent>
      <CardFooter>
        <p>Card Footer</p>
      </CardFooter>
    </Card>
  );
};
export default BlogCard;
