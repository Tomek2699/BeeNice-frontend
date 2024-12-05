import { AxiosResponse } from 'axios';
import { ApiServiceInstance, BaseResponse} from './ApiService';

interface LoginResponse extends BaseResponse {
  token: string;
}

class UserService{

  async login(email: string, password: string) : Promise<LoginResponse> {
    try {
      const response = await ApiServiceInstance.sendRequest<LoginResponse>('post', '/Authorization/Login', {email: email, password: password})
      const loginResponse: LoginResponse = {
        status: response.status,
        token: response.data.token
      };
  
      if(response.status === 200){
        await ApiServiceInstance.saveToken(response.data.token)
      }
  
      return loginResponse;
    } catch (error: any) {
      console.error('Błąd logowania:', error.response ? error.response.data : error.message);
      throw error;
    }
  };
   
  async register (email: string, password: string, confirmPassword: string) : Promise<BaseResponse> {
    try {
      const response = await ApiServiceInstance.sendRequest('post', '/Authorization/Register', { username: email, email: email, password: password, confirmPassword: confirmPassword });
      return response;
    } catch (error: any) {
      console.error('Błąd rejestracji:', error.response ? error.response.data : error.message);
      throw error;
    }
  };

  async logout() {
    try{
      await ApiServiceInstance.deleteToken();
    }
    catch (error : any){
      console.error('Logout error', error.message);
      throw error;
    }
  }
  
  async validateToken() : Promise<AxiosResponse | undefined> {
    try {
      
      const token = await ApiServiceInstance.getToken();
      if(token){
        const response = await ApiServiceInstance.sendRequest('post', '/Authorization/ValidateToken', {token})
        return response;
      }
  
      await ApiServiceInstance.deleteToken();
      return;
    }
    catch (error: any) {
      await ApiServiceInstance.deleteToken();
      if (error.response && error.response.status === 401) {
        const message = error.response.data || 'Token validation failed';
        console.log(message);
      }
      else{
        console.error('Token error', error.response ? error.response.data : error.message);
        throw error;
      }
    }
  }
}

const UserServiceInstance = new UserService();
export { UserServiceInstance };