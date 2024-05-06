import NonAuthGuard from "~/components/common/NonAuthGuard";
import RegisterForm from "~/components/forms/RegisterForm";
import { Card, CardContent } from "~/components/ui/card";

const RegisterPage = () => {
  return (
    <NonAuthGuard>
      <Card className="w-full border-none">
        <CardContent className="mx-auto max-w-lg rounded-l border border-border p-12">
          <RegisterForm></RegisterForm>
        </CardContent>
      </Card>
    </NonAuthGuard>
  );
};
export default RegisterPage;
