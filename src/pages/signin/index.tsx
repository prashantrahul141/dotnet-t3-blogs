import { Tabs, TabsContent, TabsList, TabsTrigger } from "~/components/ui/tabs";
import NonAuthGuard from "~/components/common/NonAuthGuard";
import LoginForm from "~/components/forms/LoginForm";
import RegisterForm from "~/components/forms/RegisterForm";
import { Card, CardContent } from "~/components/ui/card";

const SignInPage = () => {
  return (
    <NonAuthGuard>
      <div className="flex w-full items-center justify-center">
        <Tabs defaultValue="login" className="w-[400px]">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="login">Login</TabsTrigger>
            <TabsTrigger value="register">Register</TabsTrigger>
          </TabsList>
          <TabsContent value="login">
            <Card className="w-full border-none">
              <CardContent className="mx-auto max-w-lg rounded-l border border-border p-12">
                <LoginForm />
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="register">
            <Card className="w-full border-none">
              <CardContent className="mx-auto max-w-lg rounded-l border border-border p-12">
                <RegisterForm />
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </NonAuthGuard>
  );
};
export default SignInPage;
