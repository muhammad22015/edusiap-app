const API_URL = process.env.NEXT_PUBLIC_API_URL || 'https://edusiap-api2-498867854322.asia-southeast2.run.app';
import { apiClient } from './apiClient';

// Helper function to handle responses
const handleResponse = async (response: Response) => {
  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.error || 'Something went wrong');
  }
  return data;
};

export const registerUser = async (data: { username: string; email: string; password: string }) => {
  const response = await fetch(`${API_URL}/users/register`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
  return handleResponse(response);
};

export const loginUser = async (data: { email: string; password: string }) => {
  const response = await fetch(`${API_URL}/users/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
  return handleResponse(response);
};

export const logoutUser = async (refreshToken: string) => {
  return apiClient('/users/logout', {
    method: 'POST',
    body: JSON.stringify({ refreshtoken: refreshToken }),
  });
};

export const refreshAccessToken = async (refreshToken: string) => {
  const response = await fetch(`${API_URL}/refresh-token`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ refreshToken }),
  });
  return handleResponse(response);
};

export const getHistoryByUserId = async (userId: string) => {
  return apiClient(`/history?id=${userId}`);
};

export const getVideos = async () => {
  return apiClient('/videos');
};

export const watchVideo = async (videoId: number) => {
  return apiClient('/history/watched', {
    method: 'POST',
    body: JSON.stringify({ video_id: videoId }),
  });
};

// Add these to your existing api.ts
export const getUserProfile = async (userId: string) => {
  return apiClient(`/user-profile/?id=${userId}`);
};

export const updateUserProfile = async (userId: string, data: {
  fullname: string;
  phone: string;
  avatar?: string;
}) => {
  return apiClient(`/user-profile/update?id=${userId}`, {
    method: 'PUT',
    body: JSON.stringify(data)
  });
};

export const submitQuizScore = async (quiz_id: number, score: number) => {
  console.log('Submitting score:', { quiz_id, score }); // Add logging
  try {
    const response = await apiClient('/user-quiz/upload', {
      method: 'POST',
      body: JSON.stringify({ quiz_id, score }),
    });
    console.log('Score submission success:', response); // Add logging
    return response;
  } catch (error) {
    console.error('Score submission failed:', error); // Enhanced error logging
    throw error;
  }
};

export const getQuizByVideoId = (videoId: string) => {
  return apiClient(`/quiz/${videoId}`);
};

export const getQuizScore = async (quiz_id: number) => {
  try {
    // Use GET request with quiz_id as URL parameter
    const response = await apiClient(`/user-quiz/${quiz_id}`, {
      method: 'GET'
    });
    return response;
  } catch (error) {
    console.error('Error fetching quiz score:', error);
    throw error;
  }
};