import { ApiServiceInstance } from './ApiService';
import { HoneyCollection } from '../DataModels/HoneyCollectionModel';
import { AxiosResponse } from 'axios';

interface HoneyCollectionsResponse {
    honeyCollections: HoneyCollection[];
    status: number;
}

interface HoneyCollectionResponse {
    honeyCollection: HoneyCollection;
    status: number;
}

class QueenService {

  async getItems(hiveId: number | undefined): Promise<HoneyCollectionsResponse> {
    try {
      if(hiveId === undefined){
        throw new Error(`Błąd podczas pobierania hiveId`);
      }

      const response = await ApiServiceInstance.sendRequestWithAuth<HoneyCollection[]>('get', '/HoneyCollectionController/GetHoneyCollections', hiveId);
      const honeyCollections: HoneyCollection[] = response.data.map((item: any) => ({
        id: item.id,
        collectionDate: new Date(item.collectionDate),
        honeyQuantity: item.honeyQuantity,
        typeOfHoney: item.typeOfHoney,
        hiveId: item.hiveId,
      }));
      
      if (response.status === 200) {
        return {
            honeyCollections,
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

  async save (collectionDate: Date, honeyQuantity: number, typeOfHoney: string, hiveId: number | undefined) : Promise<HoneyCollectionResponse> {
    try {
      if(hiveId === undefined){
        throw new Error('Brak hiveId');
      }

      const response = await ApiServiceInstance.sendRequestWithAuth<HoneyCollection>('post', '/HoneyCollectionController/Save', { collectionDate: collectionDate, 
        honeyQuantity: honeyQuantity, typeOfHoney: typeOfHoney, hiveId: hiveId});
      const honeyCollection: HoneyCollection = {
        id: response.data.id,
        collectionDate: new Date(response.data.collectionDate),
        honeyQuantity: response.data.honeyQuantity,
        typeOfHoney: response.data.typeOfHoney,
        hiveId: response.data.hiveId
      }

      if (response.status === 200) {
        return {
            honeyCollection,
            status: response.status,
          };
      } 
      else {
        throw new Error(`Błąd podczas dodawania zbioru miodu: ${response.status}`);
      }
    } catch (error: any) {
      console.error('Błąd podczas dodawania zbioru miodu:', error.response ? error.response.data : error.message);
      throw error;
    }
  };

  async edit (editedHoneyCollection: HoneyCollection) : Promise<HoneyCollectionResponse> {
    try {
      const response = await ApiServiceInstance.sendRequestWithAuth<HoneyCollection>('put', '/HoneyCollectionController/Update', { id: editedHoneyCollection.id, 
        collectionDate: editedHoneyCollection.collectionDate, honeyQuantity: editedHoneyCollection.honeyQuantity, typeOfHoney: editedHoneyCollection.typeOfHoney, 
        hiveId: editedHoneyCollection.hiveId});
      const honeyCollection: HoneyCollection = {
        id: response.data.id,
        collectionDate: new Date(response.data.collectionDate),
        honeyQuantity: response.data.honeyQuantity,
        typeOfHoney: response.data.typeOfHoney,
        hiveId: response.data.hiveId
      }

      if (response.status === 200) {
        return {
            honeyCollection,
            status: response.status,
          };
      } 
      else {
        throw new Error(`Błąd podczas edytowania zbioru miodu: ${response.status}`);
      }
    } catch (error: any) {
      console.error('Błąd podczas edytowania zbioru miodu:', error.response ? error.response.data : error.message);
      throw error;
    }
  };

  async delete(id: number): Promise<AxiosResponse> {
    try {
      const response = await ApiServiceInstance.sendRequestWithAuth<HoneyCollection[]>('delete', '/HoneyCollectionController/Remove', id);
      return response;
    } catch (error) {
      console.error('Błąd podczas usuwania elementu:', error);
      throw error;
    }
  }
}

const QueenServiceInstance = new QueenService();
export default QueenServiceInstance;