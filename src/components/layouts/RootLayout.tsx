import NavBar from "../common/NavBar";

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <NavBar></NavBar>
      <main className="pt-24">{children}</main>
    </>
  );
};
export default RootLayout;
