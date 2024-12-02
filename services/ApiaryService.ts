import { ApiServiceInstance } from './ApiService';
import { Apiary } from '../DataModels/ApiaryModel';
import { AxiosResponse } from 'axios';

interface ApiariesResponse {
    apiaries: Apiary[];
    status: number;
}

interface ApiaryResponse {
  apiary: Apiary;
  status: number;
}

class ApiaryService {

  async getItems(): Promise<ApiariesResponse> {
    try {
      const response = await ApiServiceInstance.sendRequestWithAuth<Apiary[]>('get', '/ApiaryController/GetAll');

      const apiaries: Apiary[] = response.data.map((item: any) => ({
        id: item.id,
        name: item.name,
        location: item.location,
        creationDate: new Date(item.creationDate),
      }));
      
      if (response.status === 200) {
        return {
            apiaries,
            status: response.status,
          };
      } 
      else {
        throw new Error(`Błąd podczas pobierania elementów: ${response.status}`);
      }
    } catch (error) {
      console.error('Błąd podczas pobierania elementów:', error);
      throw error;
    }
  }

  async save (name: string, location: string) : Promise<ApiaryResponse> {
    try {
      const response = await ApiServiceInstance.sendRequestWithAuth<Apiary>('post', '/ApiaryController/Save', { name: name, location: location});
      const apiary: Apiary = {
        id: response.data.id,
        name: response.data.name,
        location: response.data.location,
        creationDate: new Date(response.data.creationDate),
      }

      if (response.status === 200) {
        return {
            apiary,
            status: response.status,
          };
      } 
      else {
        throw new Error(`Błąd podczas dodawania pasieki: ${response.status}`);
      }
    } catch (error: any) {
      console.error('Błąd podczas dodawania pasieki:', error.response ? error.response.data : error.message);
      throw error;
    }
  };

  async edit (editedApiary: Apiary) : Promise<ApiaryResponse> {
    try {
      const response = await ApiServiceInstance.sendRequestWithAuth<Apiary>('put', '/ApiaryController/Update', { id: editedApiary.id, name : editedApiary.name, location : editedApiary.location });
      const apiary: Apiary = {
        id: response.data.id,
        name: response.data.name,
        location: response.data.location,
        creationDate: new Date(response.data.creationDate),
      }

      if (response.status === 200) {
        return {
            apiary,
            status: response.status,
          };
      } 
      else {
        throw new Error(`Błąd podczas edytowania pasieki: ${response.status}`);
      }
    } catch (error: any) {
      console.error('Błąd podczas edytowania pasieki:', error.response ? error.response.data : error.message);
      throw error;
    }
  };

  async delete(id: number): Promise<AxiosResponse> {
    try {
      const response = await ApiServiceInstance.sendRequestWithAuth<Apiary[]>('delete', '/ApiaryController/Remove', id);
      return response;
    } catch (error) {
      console.error('Błąd podczas usuwania elementu:', error);
      throw error;
    }
  }
}

const ApiaryServiceInstance = new ApiaryService();
export default ApiaryServiceInstance;