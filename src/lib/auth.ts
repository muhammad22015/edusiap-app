// lib/auth.ts
export const setTokens = (accessToken: string, refreshToken: string) => {
  if (typeof window !== 'undefined') {
    localStorage.setItem('accessToken', accessToken);
    localStorage.setItem('refreshToken', refreshToken);
  }
};

export const getAccessToken = () => {
  if (typeof window !== 'undefined') {
    return localStorage.getItem('accessToken');
  }
  return null;
};

export const getRefreshToken = () => {
  if (typeof window !== 'undefined') {
    return localStorage.getItem('refreshToken');
  }
  return null;
};

export const clearTokens = () => {
  if (typeof window !== 'undefined') {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
  }
};

export const isAuthenticated = () => {
  return !!getAccessToken();
};

// lib/auth.ts (add this function)
export const getUserIdFromToken = (): string | null => {
  if (typeof window === 'undefined') return null;
  
  const token = localStorage.getItem('accessToken');
  if (!token) return null;

  try {
    // Decode the token without verification (since we're on client-side)
    const payload = JSON.parse(atob(token.split('.')[1]));
    return payload.user_id?.toString() || null;
  } catch (error) {
    console.error('Error decoding token:', error);
    return null;
  }
};
