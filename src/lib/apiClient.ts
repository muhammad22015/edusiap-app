// lib/apiClient.ts
import { getAccessToken, getRefreshToken, setTokens, clearTokens } from './auth';
import { refreshAccessToken } from './api';

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const apiClient = async (endpoint: string, options: RequestInit = {}) => {
  let accessToken = getAccessToken();
  const refreshToken = getRefreshToken();

  console.log('Making request to:', `${API_URL}${endpoint}`); // Log the URL
  console.log('Request options:', options); // Log request options

  const makeRequest = async (token: string | null) => {
    const headers = {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...options.headers,
    };

    console.log('Request headers:', headers); // Log headers

    const response = await fetch(`${API_URL}${endpoint}`, {
      ...options,
      headers,
    });

    console.log('Response status:', response.status); // Log status
    console.log('Response headers:', Object.fromEntries(response.headers.entries())); // Log response headers

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      console.log('Full error response:', { // More detailed error logging
        status: response.status,
        statusText: response.statusText,
        url: response.url,
        errorData
      });
      throw new Error(errorData.error || errorData.message || `Request failed with status ${response.status}`);
    }

    return response.json();
  };

  try {
    let response = await makeRequest(accessToken);
    return response;
  } catch (error: any) {
    if (error.message.includes('Unauthorized') && refreshToken) {
      try {
        const refreshResponse = await refreshAccessToken(refreshToken);
        
        if (refreshResponse.status === "Access Token berhasil dibuat") {
          setTokens(refreshResponse.response, refreshToken);
          return await makeRequest(refreshResponse.response);
        }
      } catch (refreshError) {
        console.error('Refresh token failed:', refreshError);
        throw new Error('Session expired. Please login again.');
      }
    }
    throw error;
  }
};