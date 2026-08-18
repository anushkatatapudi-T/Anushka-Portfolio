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

export function formatImgUrl(url?: string): string {
  if (!url) return '';
  if (url.startsWith('http://') || url.startsWith('https://') || url.startsWith('data:')) {
    return url;
  }
  
  // Clean leading /portfolio if present
  let cleanPath = url.replace(/^\/portfolio\//, '/');
  if (!cleanPath.startsWith('/')) {
    cleanPath = '/' + cleanPath;
  }

  // Detect if running in Vercel or client-side production without /portfolio prefix
  const isVercel = process.env.VERCEL === '1' || process.env.NEXT_PUBLIC_VERCEL_ENV !== undefined;
  
  if (isVercel) {
    return cleanPath;
  }

  // On local XAMPP or custom basePath
  const basePath = process.env.NEXT_PUBLIC_BASE_PATH !== undefined 
    ? process.env.NEXT_PUBLIC_BASE_PATH 
    : '/portfolio';

  if (basePath && !cleanPath.startsWith(basePath)) {
    return `${basePath}${cleanPath}`;
  }

  return cleanPath;
}
