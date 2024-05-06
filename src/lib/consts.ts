export const BASE_API_URL = "http://localhost:3000";

export const API_URLS = {
  Blog: {
    GetAll: () => `${BASE_API_URL}/api/Blogs/GetAll`,
    GetBlogByBlogId: (blogId: string) =>
      `${BASE_API_URL}/api/Blogs/GetBlogByBlogId/${blogId}`,

    GetBlogByUserId: (userId: string) =>
      `${BASE_API_URL}/api/Blogs/GetBlogByUserId/${userId}`,

    CreateNew: () => `${BASE_API_URL}/api/Blogs/CreateNew`,
    UpdateExisting: (blogId: number) =>
      `${BASE_API_URL}/api/Blogs/UpdateExisting/${blogId}`,
  },

  User: {
    GetLoggedInUser: () => `${BASE_API_URL}/api/User/GetLoggedInUser`,
    GetLoggedInUserImage: () => `${BASE_API_URL}/api/User/GetLoggedInUserImage`,
  },

  Auth: {
    Register: () => `${BASE_API_URL}/register`,
    Login: () => `${BASE_API_URL}/login`,
    Refresh: () => `${BASE_API_URL}/refresh`,
  },
};
