import AuthGuard from "~/components/common/AuthGuard";
import { useUserStore } from "~/components/state/stores";
import EditProfileCard from "~/components/User/EditProfile";

const ProfilePage = () => {
  const userImage = useUserStore((state) => state.image);
  const userName = useUserStore((state) => state.name);

  return (
    <AuthGuard byPassGuard={false} redirect={true}>
      <div className="w-full">
        <EditProfileCard image={userImage} name={userName} />
      </div>
    </AuthGuard>
  );
};

export default ProfilePage;
