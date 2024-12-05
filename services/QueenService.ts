import { ApiServiceInstance } from './ApiService';
import { Queen } from '../DataModels/QueenModel';
import { AxiosResponse } from 'axios';

interface QueensResponse {
    queens: Queen[];
    status: number;
}

interface QueenResponse {
  queen: Queen;
  status: number;
}

class QueenService {

  async getItems(hiveId: number | undefined): Promise<QueensResponse> {
    try {
      if(hiveId === undefined){
        throw new Error(`Błąd podczas pobierania hiveId`);
      }

      const response = await ApiServiceInstance.sendRequestWithAuth<Queen[]>('get', '/QueenController/GetQueens', hiveId);
      const queens: Queen[] = response.data.map((item: any) => ({
        id: item.id,
        queenNumber: item.queenNumber,
        race: item.race,
        hatchDate: new Date(item.hatchDate),
        state: item.state,
        hiveId: item.hiveId,
      }));
      
      if (response.status === 200) {
        return {
            queens,
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

  async save (queenNumber: string, race: string, hatchDate: Date, state: string, hiveId: number | undefined) : Promise<QueenResponse> {
    try {
      if(hiveId === undefined){
        throw new Error('Brak hiveId');
      }

      const response = await ApiServiceInstance.sendRequestWithAuth<Queen>('post', '/QueenController/Save', { queenNumber: queenNumber, race: race, hatchDate: hatchDate, 
        state: state, hiveId: hiveId});
      const queen: Queen = {
        id: response.data.id,
        queenNumber: response.data.queenNumber,
        race: response.data.race,
        hatchDate: response.data.hatchDate,
        state: response.data.state,
        hiveId: response.data.hiveId
      }

      if (response.status === 200) {
        return {
            queen,
            status: response.status,
          };
      } 
      else {
        throw new Error(`Błąd podczas dodawania matki: ${response.status}`);
      }
    } catch (error: any) {
      console.error('Błąd podczas dodawania matki:', error.response ? error.response.data : error.message);
      throw error;
    }
  };

  async edit (editedQueen: Queen) : Promise<QueenResponse> {
    try {
      const response = await ApiServiceInstance.sendRequestWithAuth<Queen>('put', '/QueenController/Update', { id: editedQueen.id, queenNumber: editedQueen.queenNumber, 
        race: editedQueen.race, hatchDate: editedQueen.hatchDate, state: editedQueen.state, hiveId: editedQueen.hiveId});
      const queen: Queen = {
        id: response.data.id,
        queenNumber: response.data.queenNumber,
        race: response.data.race,
        hatchDate: new Date(response.data.hatchDate),
        state: response.data.state,
        hiveId: response.data.hiveId
      }

      if (response.status === 200) {
        return {
            queen,
            status: response.status,
          };
      } 
      else {
        throw new Error(`Błąd podczas edytowania matki: ${response.status}`);
      }
    } catch (error: any) {
      console.error('Błąd podczas edytowania matki:', error.response ? error.response.data : error.message);
      throw error;
    }
  };

  async delete(id: number): Promise<AxiosResponse> {
    try {
      const response = await ApiServiceInstance.sendRequestWithAuth<Queen[]>('delete', '/QueenController/Remove', id);
      return response;
    } catch (error) {
      console.error('Błąd podczas usuwania elementu:', error);
      throw error;
    }
  }
}

const QueenServiceInstance = new QueenService();
export default QueenServiceInstance;