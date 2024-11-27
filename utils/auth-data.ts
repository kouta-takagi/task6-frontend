import type { AuthHeaders } from "@/types/auth.js";

export const getAuthDataFromStorage = (): AuthHeaders => {
  return {
    "access-token": localStorage.getItem("access-token"),
    client: localStorage.getItem("client"),
    expiry: localStorage.getItem("expiry"),
    uid: localStorage.getItem("uid"),
    "content-type": localStorage.getItem("content-type"),
  };
};

export const setAuthDataFromResponse = (authData: AuthHeaders): void => {
  if (
    authData["access-token"] &&
    authData.client &&
    authData.uid &&
    authData.expiry &&
    authData["content-type"]
  ) {
    localStorage.setItem("access-token", authData["access-token"]);
    localStorage.setItem("client", authData.client);
    localStorage.setItem("expiry", authData.expiry);
    localStorage.setItem("uid", authData.uid);
    localStorage.setItem("content-type", authData["content-type"]);
    const accessToken = useCookie("access-token");
    const client = useCookie("client");
    const uid = useCookie("uid");

    accessToken.value = authData["access-token"];
    client.value = authData.client;
    uid.value = authData.uid;
  }
};

export const removeAuthDataFromStorage = (): void => {
  localStorage.removeItem("access-token");
  localStorage.removeItem("client");
  localStorage.removeItem("expiry");
  localStorage.removeItem("uid");
  localStorage.removeItem("content-type");
};
