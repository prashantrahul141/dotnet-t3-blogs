import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import type { TBlog } from "~/types";
import Link from "next/link";
import ReactTimeAgo from "react-time-ago";
import { useUserStore } from "../state/stores";
import { MdModeEditOutline } from "react-icons/md";
import { Button } from "../ui/button";
import { useState } from "react";

import { Label } from "@radix-ui/react-label";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "~/components/ui/dialog";
import { Input } from "../ui/input";
import EditBlogDialog from "./EditBlogDialog";

const BlogCard = ({ blogData }: { blogData: TBlog }) => {
  const isAuthor = useUserStore((state) => state.userId) !== blogData.userId;
  const [showDialog, setShowDialog] = useState(false);

  return (
    <>
      <Card className="relative">
        <div className="absolute right-0 top-0">
          {isAuthor && (
            <Button
              variant={"ghost"}
              onClick={() => setShowDialog(!showDialog)}
              className="h-12 w-12 rounded-full"
            >
              <MdModeEditOutline className="text-primary" />
            </Button>
          )}
        </div>
        <CardHeader>
          <CardTitle>{blogData.title}</CardTitle>
          <CardDescription className="text-xs">
            <Link
              href={`/profile/${blogData.userName}`}
              className="hover:underline"
            >
              @{blogData.userName}
            </Link>{" "}
            <ReactTimeAgo date={new Date(blogData.createdAt)}></ReactTimeAgo>
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
      />
    </>
  );
};
export default BlogCard;
