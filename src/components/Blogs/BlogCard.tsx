import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar";
import { LuDot } from "react-icons/lu";
import type { TBlog } from "~/types";
import Link from "next/link";
import ReactTimeAgo from "react-time-ago";
import { useUserStore } from "../state/stores";
import { MdModeEditOutline } from "react-icons/md";
import { Button } from "../ui/button";
import { useState } from "react";
import EditBlogDialog from "./EditBlogDialog";
import { convertDateUTC } from "~/lib/utils";

const BlogCard = ({ reblogData }: { reblogData: TBlog }) => {
  const isAuthor = useUserStore((state) => state.userId) === reblogData.userId;
  const [showDialog, setShowDialog] = useState(false);
  const [blogData, setBlogData] = useState(reblogData);

  return (
    <>
      <Card className="group relative">
        <div className="absolute right-0 top-0">
          {isAuthor && (
            <Button
              variant={"ghost"}
              onClick={() => setShowDialog(!showDialog)}
              className="h-12 w-12 rounded-full opacity-0 transition-all duration-300 ease-in-out group-hover:opacity-100"
            >
              <MdModeEditOutline className="text-primary" />
            </Button>
          )}
        </div>
        <CardHeader>
          <Link href={"/blog/" + blogData.id}>
            <CardTitle>{blogData.title}</CardTitle>
          </Link>
          <CardDescription className="flex gap-1 text-xs">
            <Link
              href={`/profile/${blogData.userName}`}
              className="flex gap-1 hover:underline"
            >
              <Avatar className="h-5 w-5">
                <AvatarImage src={blogData.userImage} />
                <AvatarFallback>PF</AvatarFallback>
              </Avatar>
              {blogData.userName}
            </Link>
            {"·"}
            <ReactTimeAgo
              date={convertDateUTC(blogData.createdAt)}
            ></ReactTimeAgo>
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p>{blogData.body}</p>
        </CardContent>
      </Card>

      <EditBlogDialog
        open={showDialog}
        onOpenChange={setShowDialog}
        blogData={blogData}
        setThisBlog={(values: { title: string; body: string }) =>
          setBlogData((prev) => {
            return { ...prev, ...values };
          })
        }
      />
    </>
  );
};
export default BlogCard;
