import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import { Card, CardHeader, CardTitle } from "~/components/ui/card";
import EditProfileForm from "../forms/EditProfileForm";

const EditProfileCard = ({ name, image }: { name: string; image: string }) => {
  return (
    <Card className="mx-auto w-fit">
      <CardHeader>
        <CardTitle className="flex flex-col items-center gap-7 md:flex-row">
          <Avatar>
            <AvatarImage src={image} className="h-44 w-44 rounded-full" />
            <AvatarFallback>PF</AvatarFallback>
          </Avatar>
          <EditProfileForm data={{ name, image }} />
        </CardTitle>
      </CardHeader>
    </Card>
  );
};
export default EditProfileCard;
