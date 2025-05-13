/**
 * @param path - リクエストのパス（ベースURLを除いた部分）
 * @param options - fetchのオプション
 * @returns レスポンスデータ
 */
export async function fetchWithAuth<T>(path: string, options: RequestInit = {}): Promise<T> {
  const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:3000';
  const url = `${baseUrl}${path}`;

  const token = document.cookie
    .split('; ')
    .find((row) => row.startsWith('au='))
    ?.split('=')[1];

  if (!token) {
    window.location.href = '/';
    throw new Error('Authentication token not found');
  }

  const headers = {
    'Content-Type': 'application/json',
    ...(options.headers || {}),
    Authorization: `Bearer ${token}`,
  };

  const response = await fetch(url, {
    ...options,
    headers,
    credentials: 'include',
  });

  if (!response.ok) {
    if (response.status === 401) {
      window.location.href = '/';
    }

    const errorData = await response.json().catch(() => ({}));
    throw {
      status: response.status,
      statusText: response.statusText,
      data: errorData,
    };
  }

  const data: T = await response.json();
  return data;
}
