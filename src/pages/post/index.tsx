import AuthGuard from "~/components/common/AuthGuard";
import CreateBlogForm from "~/components/forms/CreateBlog";

const PostPage = () => {
  return (
    <AuthGuard byPassGuard={false} redirect={true}>
      <div>
        <div className="mx-auto w-fit">
          <p className="text-lg font-bold text-primary">Post a new blog</p>
        </div>
        <CreateBlogForm />
      </div>
    </AuthGuard>
  );
};
export default PostPage;
