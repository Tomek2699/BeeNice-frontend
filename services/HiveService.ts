import { ApiServiceInstance } from './ApiService';
import { Hive } from '../DataModels/HiveModel';
import { AxiosResponse } from 'axios';

interface HivesResponse {
    hives: Hive[];
    status: number;
}

interface HiveResponse {
  hive: Hive;
  status: number;
}

class HiveService {

  async getItems(apiaryId: number | undefined): Promise<HivesResponse> {
    try {
      if(apiaryId === undefined){
        throw new Error(`Błąd podczas pobierania apiaryId`);
      }

      const response = await ApiServiceInstance.sendRequestWithAuth<Hive[]>('get', '/HiveController/GetHives', apiaryId);
      const hives: Hive[] = response.data.map((item: any) => ({
        id: item.id,
        hiveNumber: item.hiveNumber,
        type: item.type,
        state: item.state,
        apiaryId: item.apaiaryId
      }));
      
      if (response.status === 200) {
        return {
            hives,
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

  async save (hiveNumber: string, type: string, state: string, apiaryId: number | undefined) : Promise<HiveResponse> {
    try {
      if(apiaryId === undefined){
        throw new Error('Brak apiaryId');
      }

      const response = await ApiServiceInstance.sendRequestWithAuth<Hive>('post', '/HiveController/Save', { hiveNumber: hiveNumber, type: type, state: state, apiaryId: apiaryId});
      const hive: Hive = {
        id: response.data.id,
        hiveNumber: response.data.hiveNumber,
        type: response.data.type,
        state: response.data.state,
        apiaryId: response.data.apiaryId
      }

      if (response.status === 200) {
        return {
            hive,
            status: response.status,
          };
      } 
      else {
        throw new Error(`Błąd podczas dodawania ula: ${response.status}`);
      }
    } catch (error: any) {
      console.error('Błąd podczas dodawania ula:', error.response ? error.response.data : error.message);
      throw error;
    }
  };

  async edit (editedHive: Hive) : Promise<HiveResponse> {
    try {
      const response = await ApiServiceInstance.sendRequestWithAuth<Hive>('put', '/HiveController/Update', { id: editedHive.id, hiveNumber: editedHive.hiveNumber, 
        type: editedHive.type,  state: editedHive.state, apiaryId: editedHive.apiaryId});
      const hive: Hive = {
        id: response.data.id,
        hiveNumber: response.data.hiveNumber,
        type: response.data.type,
        state: response.data.state,
        apiaryId: response.data.apiaryId
      }

      if (response.status === 200) {
        return {
            hive,
            status: response.status,
          };
      } 
      else {
        throw new Error(`Błąd podczas edytowania ula: ${response.status}`);
      }
    } catch (error: any) {
      console.error('Błąd podczas edytowania ula:', error.response ? error.response.data : error.message);
      throw error;
    }
  };

  async delete(id: number): Promise<AxiosResponse> {
    try {
      const response = await ApiServiceInstance.sendRequestWithAuth<Hive[]>('delete', '/HiveController/Remove', id);
      return response;
    } catch (error) {
      console.error('Błąd podczas usuwania elementu:', error);
      throw error;
    }
  }
}

const HiveServiceInstance = new HiveService();
export default HiveServiceInstance;