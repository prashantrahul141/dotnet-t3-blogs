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
  name: "",
  image: "",
  isLoggedIn: false,
  updatePerson: (user: TSessionUser) =>
    set(() => ({
      email: user.email,
      userId: user.userId,
      name: user.name,
      image: user.image,
      isLoggedIn: user.isLoggedIn,
    })),
}));
