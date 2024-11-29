type HttpMethod = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";

interface FetchWithAuthOptions extends Omit<RequestInit, "method" | "body"> {
  method?: HttpMethod;
  body?: object;
}

export async function fetchWithAuth(
  url: string,
  options: FetchWithAuthOptions = {}
) {
  const { method = "GET", body, ...restOptions } = options;

  // Fetch the auth token from our new API route
  const tokenResponse = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/token`);
  const { token } = await tokenResponse.json();

  const headers = new Headers(restOptions.headers);
  if (token) {
    headers.append("Authorization", `Bearer ${token}`);
  }

  if (!headers.has("Content-Type") && method !== "GET" && method !== "DELETE") {
    headers.append("Content-Type", "application/json");
  }

  const fetchOptions: RequestInit = {
    ...restOptions,
    method,
    headers,
    credentials: "include",
  };

  if (body && method !== "GET") {
    fetchOptions.body = JSON.stringify(body);
  }

  try {
    const response = await fetch(url, fetchOptions);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return response;
  } catch (error) {
    console.error("Fetch error:", error);
    throw error;
  }
}
