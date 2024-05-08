import AuthGuard from "~/components/common/AuthGuard";
import { useUserStore } from "~/components/state/stores";
import EditProfileCard from "~/components/User/EditProfile";

const ProfilePage = () => {
  const userImage = useUserStore((state) => state.avatar);
  const userName = useUserStore((state) => state.username);

  return (
    <AuthGuard byPassGuard={false} redirect={true}>
      <div className="w-full">
        <EditProfileCard image={userImage} name={userName} />
      </div>
    </AuthGuard>
  );
};

export default ProfilePage;
