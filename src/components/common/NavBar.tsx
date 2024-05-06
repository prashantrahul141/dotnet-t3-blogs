import { Button } from "~/components/ui/button";
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar";
import { useUserStore } from "../state/stores";

const NavBar = () => {
  const isLoggedIn = useUserStore((state) => state.isLoggedIn);
  const userImage = useUserStore((state) => state.image);

  return (
    <header className="fixed left-0 top-0 flex h-14 w-[100%] items-center border-b border-b-border bg-background/50 px-4 backdrop-blur-sm backdrop-brightness-50 md:px-6">
      <Link className="mr-4 flex h-full items-center gap-2" href="/">
        <span className="text-lg font-semibold text-primary">Cisurp</span>
      </Link>

      <nav className="flex h-full flex-1 items-center space-x-4 md:pl-4">
        {isLoggedIn && (
          <>
            <Link
              className="pt-[.2rem] text-xs text-muted-foreground transition-colors duration-200 ease-in-out hover:text-primary"
              href="/"
            >
              Blogs
            </Link>
            <Link
              className="pt-[.2rem] text-xs text-muted-foreground transition-colors duration-200 ease-in-out hover:text-primary"
              href="/post"
            >
              Post
            </Link>
          </>
        )}
      </nav>

      {!isLoggedIn && (
        <Link href={"/signin"}>
          <Button
            size="sm"
            variant="outline"
            className="rounded-lg text-primary"
          >
            Sign in
          </Button>
        </Link>
      )}

      {isLoggedIn && (
        <Link href={"/profile"}>
          <Avatar>
            <AvatarImage src={userImage} />
            <AvatarFallback>PF</AvatarFallback>
          </Avatar>
        </Link>
      )}
    </header>
  );
};

export default NavBar;
