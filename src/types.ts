import { z } from "zod";

export const ZBlog = z.object({
  id: z.number(),
  title: z.string(),
  body: z.string(),
  userId: z.string(),
  userName: z.string(),
  createdAt: z.string(),
  userImage: z.string().url(),
});

export type TBlog = z.infer<typeof ZBlog>;

export const ZBlogArray = z.array(ZBlog);

export const ZUser = z.object({
  email: z.string().email(),
  userId: z.string(),
  username: z.string(),
  avatar: z.string().url(),
});

export type TUser = z.infer<typeof ZUser>;

export const ZPublicUser = ZUser.omit({ email: true });

export type TPublicUser = z.infer<typeof ZPublicUser>;
