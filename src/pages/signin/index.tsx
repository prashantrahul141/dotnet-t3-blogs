import { Tabs, TabsContent, TabsList, TabsTrigger } from "~/components/ui/tabs";
import NonAuthGuard from "~/components/common/NonAuthGuard";
import LoginForm from "~/components/forms/LoginForm";
import RegisterForm from "~/components/forms/RegisterForm";
import { Card, CardContent } from "~/components/ui/card";
import { useState } from "react";

const SignInPage = () => {
  const [currentTab, setCurrentTab] = useState<string>("login");

  return (
    <NonAuthGuard>
      <div className="flex w-full items-center justify-center">
        <Tabs
          value={currentTab}
          onValueChange={(value) => setCurrentTab(value)}
          className="w-[400px]"
        >
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
                <RegisterForm
                  setCurrentTab={(value: string) => setCurrentTab(value)}
                />
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </NonAuthGuard>
  );
};
export default SignInPage;
