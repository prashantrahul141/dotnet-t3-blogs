import BlogList from "~/components/Blogs/BlogList";
import AuthGuard from "~/components/common/AuthGuard";

const Home = () => {
  return (
    <AuthGuard byPassGuard={true} redirect={false}>
      <BlogList></BlogList>
    </AuthGuard>
  );
};

export default Home;
