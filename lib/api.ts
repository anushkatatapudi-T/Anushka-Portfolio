export async function apiFetch(endpoint: string, options?: RequestInit): Promise<Response> {
  const primaryUrl = endpoint.startsWith('/portfolio') ? endpoint : `/portfolio${endpoint}`;
  try {
    let res = await fetch(primaryUrl, options);
    if (!res.ok && res.status === 404 && primaryUrl.startsWith('/portfolio')) {
      res = await fetch(endpoint, options);
    }
    return res;
  } catch (err) {
    return fetch(endpoint, options);
  }
}
