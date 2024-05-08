import type { TUser } from "~/types";
import { create } from "zustand";

type TSessionUser = TUser & { isLoggedIn: boolean };

export const useUserStore = create<
  TSessionUser & {
    updatePerson: (user: TSessionUser) => void;
  }
>()((set) => ({
  email: "",
  userId: "",
  username: "",
  avatar: "",
  isLoggedIn: false,
  updatePerson: (user: TSessionUser) =>
    set(() => ({
      email: user.email,
      userId: user.userId,
      username: user.username,
      avatar: user.avatar,
      isLoggedIn: user.isLoggedIn,
    })),
}));
