import axios, { AxiosInstance, AxiosResponse  } from 'axios';
import * as SecureStore from 'expo-secure-store';
import { router } from 'expo-router';

interface BaseResponse {
  status: number;
}

class ApiService {
  private ApiServiceInstance: AxiosInstance;
  
  constructor() {
    this.ApiServiceInstance = axios.create({
      baseURL: 'http://51.68.139.55:5000/api',
      timeout: 30000,
    });
  }

  setAuthHeader(token: string): void {
    this.ApiServiceInstance.defaults.headers['Authorization'] = `Bearer ${token}`;
  }

  removeAuthHeader(): void {
    delete this.ApiServiceInstance.defaults.headers['Authorization'];
  }

  async saveToken(token: string): Promise<void> {
    await SecureStore.setItemAsync('authToken', token);
  }

  async getToken(): Promise<string | null> {
    const token = await SecureStore.getItemAsync('authToken');
    return token;
  }

  async deleteToken(): Promise<void> {
    await SecureStore.deleteItemAsync('authToken');
  }

  async sendRequest<T>(
    method: 'get' | 'post' | 'put' | 'delete',
    url: string,
    data?: any,
  ): Promise<AxiosResponse<T>> {
    try {
      const response: AxiosResponse<T> = await this.ApiServiceInstance.request<T>({
        method,
        url,
        data,
      });

      return response;
    } catch (error) {
      console.error('API request failed:', error);
      throw error;
    }
  }

  async sendRequestWithAuth<T>(
    method: 'get' | 'post' | 'put' | 'delete',
    url: string,
    data?: any
  ): Promise<AxiosResponse<T>> {
    try {
      const token = await this.getToken();
      
      if (token) {
        this.setAuthHeader(token);
      }
      else{
        router.replace('/sign-in')
      }

      if (method === 'get' || method === 'delete') {
        if (Array.isArray(data)) {
          url += data.map(item => `/${item}`).join('');
        } else if (data) {
          url += `/${data}`;
        }
      }
      
      const response: AxiosResponse<T> = await this.ApiServiceInstance.request<T>({
        method,
        url,
        data,
      });
  
      return response;
    } catch (error: any) {
      if (error.response) {
        const serverMessage = error.response.data?.message;
        if (serverMessage === 'Token has expired') {
          console.warn('Token has expired');
        }
      }
      console.error('API request failed:', error);
      throw error;
    }
  }
}

const ApiServiceInstance = new ApiService();
export { ApiServiceInstance, BaseResponse };