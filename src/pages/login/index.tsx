import NonAuthGuard from "~/components/common/NonAuthGuard";
import LoginForm from "~/components/forms/LoginForm";
import { Card, CardContent } from "~/components/ui/card";

const LoginPage = () => {
  return (
    <NonAuthGuard>
      <Card className="w-full border-none">
        <CardContent className="mx-auto max-w-lg rounded-l border border-border p-12">
          <LoginForm></LoginForm>
        </CardContent>
      </Card>
    </NonAuthGuard>
  );
};
export default LoginPage;
