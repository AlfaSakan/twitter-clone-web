export const env = {
  apiBaseUrl: import.meta.env.VITE_API_BASE_URL ?? "http://localhost:8081",
  apiVersion: import.meta.env.VITE_API_VERSION || "/v1",
};
