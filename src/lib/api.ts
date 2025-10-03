import axios from 'axios';

// API base configuration
const API_BASE_URL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:3001';

// Create axios instance with default config
const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor for logging
api.interceptors.request.use(
  (config) => {
    console.log(`🚀 API Request: ${config.method?.toUpperCase()} ${config.url}`);
    return config;
  },
  (error) => {
    console.error('❌ API Request Error:', error);
    return Promise.reject(error);
  }
);

// Response interceptor for logging and error handling
api.interceptors.response.use(
  (response) => {
    console.log(`✅ API Response: ${response.status} ${response.config.url}`);
    return response;
  },
  (error) => {
    console.error('❌ API Response Error:', error.response?.status, error.response?.data);
    return Promise.reject(error);
  }
);

// Types for API responses
export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data?: T;
  count?: number;
  error?: string;
}

export interface Feedback {
  _id: string;
  name: string;
  email: string;
  message: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreateFeedbackRequest {
  name: string;
  email: string;
  message: string;
}

export interface UpdateFeedbackRequest {
  name?: string;
  email?: string;
  message?: string;
}

// Feedback API functions
export const feedbackApi = {
  // Create new feedback
  create: async (data: CreateFeedbackRequest): Promise<ApiResponse<Feedback>> => {
    const response = await api.post<ApiResponse<Feedback>>('/api/feedbacks', data);
    return response.data;
  },

  // Get all feedbacks
  getAll: async (): Promise<ApiResponse<Feedback[]>> => {
    const response = await api.get<ApiResponse<Feedback[]>>('/api/feedbacks');
    return response.data;
  },

  // Get single feedback by ID
  getById: async (id: string): Promise<ApiResponse<Feedback>> => {
    const response = await api.get<ApiResponse<Feedback>>(`/api/feedbacks/${id}`);
    return response.data;
  },

  // Update feedback by ID
  update: async (id: string, data: UpdateFeedbackRequest): Promise<ApiResponse<Feedback>> => {
    const response = await api.put<ApiResponse<Feedback>>(`/api/feedbacks/${id}`, data);
    return response.data;
  },

  // Delete feedback by ID
  delete: async (id: string): Promise<ApiResponse<Feedback>> => {
    const response = await api.delete<ApiResponse<Feedback>>(`/api/feedbacks/${id}`);
    return response.data;
  },
};

// Health check
export const healthCheck = async (): Promise<ApiResponse<any>> => {
  const response = await api.get<ApiResponse<any>>('/health');
  return response.data;
};

// Export the axios instance for custom requests
export default api;
