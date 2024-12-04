import { ApiServiceInstance } from './ApiService';
import { BeeFamily } from '../DataModels/BeeFamilyMode';
import { AxiosResponse } from 'axios';

interface BeeFamiliesResponse {
    beeFamilies: BeeFamily[];
    status: number;
}

interface BeeFamilyResponse {
    beeFamily: BeeFamily;
    status: number;
}

class QueenService {

  async getItems(hiveId: number | undefined): Promise<BeeFamiliesResponse> {
    try {
      if(hiveId === undefined){
        throw new Error(`Błąd podczas pobierania hiveId`);
      }

      const response = await ApiServiceInstance.sendRequestWithAuth<BeeFamily[]>('get', '/BeeFamilyController/GetBeeFamilies', hiveId);
      const beeFamilies: BeeFamily[] = response.data.map((item: any) => ({
        id: item.id,
        familyNumber: item.familyNumber,
        race: item.race,
        familyState: item.familyState,
        creationDate: item.creationDate,
        hiveId: item.hiveId,
      }));
      
      if (response.status === 200) {
        return {
            beeFamilies,
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

  async save (familyNumber: string, race: string, familyState: string, creationDate: Date, hiveId: number | undefined) : Promise<BeeFamilyResponse> {
    try {
      if(hiveId === undefined){
        throw new Error('Brak hiveId');
      }

      const response = await ApiServiceInstance.sendRequestWithAuth<BeeFamily>('post', '/BeeFamilyController/Save', { familyNumber: familyNumber, race: race, 
        familyState: familyState, creationDate: creationDate, hiveId: hiveId});
      const beeFamily: BeeFamily = {
        id: response.data.id,
        familyNumber: response.data.familyNumber,
        race: response.data.race,
        familyState: response.data.familyState,
        creationDate: response.data.creationDate,
        hiveId: response.data.hiveId
      }

      if (response.status === 200) {
        return {
            beeFamily,
            status: response.status,
          };
      } 
      else {
        throw new Error(`Błąd podczas dodawania rodziny pszczelej: ${response.status}`);
      }
    } catch (error: any) {
      console.error('Błąd podczas dodawania rodziny pszczelej:', error.response ? error.response.data : error.message);
      throw error;
    }
  };

  async edit (editedBeeFamily: BeeFamily) : Promise<BeeFamilyResponse> {
    try {
      const response = await ApiServiceInstance.sendRequestWithAuth<BeeFamily>('put', '/BeeFamilyController/Update', { id: editedBeeFamily.id, familyNumber: 
        editedBeeFamily.familyNumber, race: editedBeeFamily.race, familyState: editedBeeFamily.familyState, creationDate: editedBeeFamily.creationDate, hiveId: editedBeeFamily.hiveId});
      const beeFamily: BeeFamily = {
        id: response.data.id,
        familyNumber: response.data.familyNumber,
        race: response.data.race,
        familyState: response.data.familyState,
        creationDate: response.data.creationDate,
        hiveId: response.data.hiveId
      }

      if (response.status === 200) {
        return {
            beeFamily,
            status: response.status,
          };
      } 
      else {
        throw new Error(`Błąd podczas edytowania rodziny pszczelej: ${response.status}`);
      }
    } catch (error: any) {
      console.error('Błąd podczas edytowania rodziny pszczelej:', error.response ? error.response.data : error.message);
      throw error;
    }
  };

  async delete(id: number): Promise<AxiosResponse> {
    try {
      const response = await ApiServiceInstance.sendRequestWithAuth<BeeFamily[]>('delete', '/BeeFamilyController/Remove', id);
      return response;
    } catch (error) {
      console.error('Błąd podczas usuwania elementu:', error);
      throw error;
    }
  }
}

const QueenServiceInstance = new QueenService();
export default QueenServiceInstance;