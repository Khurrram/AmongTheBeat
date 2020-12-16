import * as Cookies from "js-cookie";

export const setSessionCookie = (session) => {
  Cookies.remove("session");
  Cookies.set("session", session, { expires: 50/1440 });
};

export const removeSessionCookie = () => {
  Cookies.remove("session")
}

export const getSessionCookie = () => {
  const sessionCookie = Cookies.get("session");

  if (sessionCookie === undefined) {
    return {};
  } else {
    // console.log(sessionCookie);
    return JSON.parse(sessionCookie);
  }
};
