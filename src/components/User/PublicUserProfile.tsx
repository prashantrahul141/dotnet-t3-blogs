import { TPublicUser } from "~/types";
import BlogListUser from "../Blogs/BlogListUser";
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";

const PublicUserProfile = ({ user }: { user: TPublicUser }) => {
  return (
    <>
      <Card className="mx-auto mb-12 flex w-full max-w-xl">
        <CardHeader>
          <CardTitle className="flex flex-col items-center gap-7 md:flex-row">
            <Avatar>
              <AvatarImage
                src={user.avatar}
                className="h-44 w-44 rounded-full"
              />
              <AvatarFallback>PF</AvatarFallback>
            </Avatar>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="mt-12">
            <p className="text-sm text-muted-foreground">Username</p>
            <p className="text-lg font-bold">{user.username}</p>
          </div>
        </CardContent>
      </Card>
      <div className="w-full">
        <div className="mx-auto w-full max-w-xl">
          <p className="pl-1 text-xl font-semibold text-primary">Blogs</p>
        </div>
      </div>
      <BlogListUser userId={user.userId}></BlogListUser>
    </>
  );
};

export default PublicUserProfile;
