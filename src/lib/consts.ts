export const BASE_API_URL =
  process.env.NODE_ENV === "development"
    ? "http://localhost:5248"
    : "http://localhost:5248";

export const API_URLS = {
  Blog: {
    GetAll: () => `${BASE_API_URL}/api/Blogs/GetAll` as const,
    GetBlogByBlogId: (blogId: string) =>
      `${BASE_API_URL}/api/Blogs/GetBlogByBlogId/${blogId}` as const,

    GetBlogByUserId: (userId: string) =>
      `${BASE_API_URL}/api/Blogs/GetBlogByUserId/${userId}` as const,

    CreateNew: () => `${BASE_API_URL}/api/Blogs/CreateNew` as const,
    UpdateExisting: (blogId: number) =>
      `${BASE_API_URL}/api/Blogs/UpdateExisting/${blogId}` as const,
  },

  User: {
    GetLoggedInUser: () => `${BASE_API_URL}/api/User/GetLoggedInUser` as const,
    GetLoggedInUserImage: () =>
      `${BASE_API_URL}/api/User/GetLoggedInUserImage` as const,
    UpdateUser: () => `${BASE_API_URL}/api/User/UpdateUser` as const,
    GetUserById: (userId: string) =>
      `${BASE_API_URL}/api/User/GetUserById/${userId}` as const,
    GetUserByUsername: (userName: string) =>
      `${BASE_API_URL}/api/User/GetUserByUsername/${userName}` as const,
  },

  Auth: {
    Register: () => `${BASE_API_URL}/api/auth/register` as const,
    Login: () => `${BASE_API_URL}/api/auth/login` as const,
    Refresh: () => `${BASE_API_URL}/api/auth/refresh` as const,
  },
};
