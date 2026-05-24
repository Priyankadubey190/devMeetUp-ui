export const BASE_URL =
  typeof window !== "undefined" &&
  (location.hostname === "localhost" || location.hostname === "127.0.0.1")
    ? "http://localhost:8080"
    : "https://devmeetupapp-api.onrender.com";
