import { createContext } from "react";

export const UserContext = createContext({
  token: null,
  update: (value) => { },
  login: (value) => { },
  logout: (value) => { }
});
