export const BASE_API_URL = "http://localhost:3000";

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
  },

  Auth: {
    Register: () => `${BASE_API_URL}/register` as const,
    Login: () => `${BASE_API_URL}/login` as const,
    Refresh: () => `${BASE_API_URL}/refresh` as const,
  },
};
