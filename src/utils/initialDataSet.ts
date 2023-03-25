import { LOCALSTORAGE_USERS_KEY } from "commons/constants/auth";

export const saveInitialData = () => {
  localStorage.setItem(
    LOCALSTORAGE_USERS_KEY,
    JSON.stringify([
      { email: "john@doe.com", password: "1234" },
      { email: "anna@doe.com", password: "5678" },
      { email: "bob@doe.com", password: "9012" },
    ])
  );
};
