export const ROUTES_CORE = {
  LOGIN: "/login",
  DASHBOARD: "/dashboard",
};

export const ROUTES_PROFILES = {
  ADD_PROFILE: "/profiles/add",
  PROFILES_LIST: "/profiles/list",
  PROFILE_EDIT: (profileId: string) => `/profiles/edit/${profileId}`,
};
