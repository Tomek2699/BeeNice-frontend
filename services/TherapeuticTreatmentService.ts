import { ApiServiceInstance } from './ApiService';
import { TherapeuticTreatment } from '../DataModels/TherapeuticTreatmentModel';
import { AxiosResponse } from 'axios';

interface TherapeuticTreatmentsResponse {
    therapeuticTreatments: TherapeuticTreatment[];
    status: number;
}

interface TherapeuticTreatmentResponse {
    therapeuticTreatment: TherapeuticTreatment;
  status: number;
}

class TherapeuticTreatmentService {

  async getItems(hiveId: number | undefined): Promise<TherapeuticTreatmentsResponse> {
    try {
      if(hiveId === undefined){
        throw new Error(`Błąd podczas pobierania hiveId`);
      }

      const response = await ApiServiceInstance.sendRequestWithAuth<TherapeuticTreatment[]>('get', '/TherapeuticTreatmentController/GetTherapeuticTreatments', hiveId);
      const therapeuticTreatments: TherapeuticTreatment[] = response.data.map((item: any) => ({
        id: item.id,
        treatmentDate: new Date(item.treatmentDate),
        medicine: item.medicine,
        dose: item.dose,
        comment: item.comment,
        hiveId: item.hiveId,
      }));
      
      if (response.status === 200) {
        return {
            therapeuticTreatments,
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

  async save (treatmentDate: Date, medicine: string, dose: string, comment: string, hiveId: number | undefined) : Promise<TherapeuticTreatmentResponse> {
    try {
      if(hiveId === undefined){
        throw new Error('Brak hiveId');
      }

      const response = await ApiServiceInstance.sendRequestWithAuth<TherapeuticTreatment>('post', '/TherapeuticTreatmentController/Save', { treatmentDate: treatmentDate, 
        medicine: medicine, dose: dose, comment: comment, hiveId: hiveId});
      const therapeuticTreatment: TherapeuticTreatment = {
        id: response.data.id,
        treatmentDate: new Date(response.data.treatmentDate),
        medicine: response.data.medicine,
        dose:  response.data.dose,
        comment: response.data.comment,
        hiveId: response.data.hiveId
      }

      if (response.status === 200) {
        return {
            therapeuticTreatment,
            status: response.status,
          };
      } 
      else {
        throw new Error(`Błąd podczas dodawania zabiegu: ${response.status}`);
      }
    } catch (error: any) {
      console.error('Błąd podczas dodawania zabiegu:', error.response ? error.response.data : error.message);
      throw error;
    }
  };

  async edit (editedTherapeuticTreatment: TherapeuticTreatment) : Promise<TherapeuticTreatmentResponse> {
    try {
      const response = await ApiServiceInstance.sendRequestWithAuth<TherapeuticTreatment>('put', '/TherapeuticTreatmentController/Update', { id: editedTherapeuticTreatment.id, 
        treatmentDate: editedTherapeuticTreatment.treatmentDate, medicine: editedTherapeuticTreatment.medicine, dose: editedTherapeuticTreatment.dose, 
        comment: editedTherapeuticTreatment.comment, hiveId: editedTherapeuticTreatment.hiveId});
      const therapeuticTreatment: TherapeuticTreatment = {
        id: response.data.id,
        treatmentDate: new Date(response.data.treatmentDate),
        medicine: response.data.medicine,
        dose: response.data.dose,
        comment: response.data.comment,
        hiveId: response.data.hiveId
      }

      if (response.status === 200) {
        return {
            therapeuticTreatment,
            status: response.status,
          };
      } 
      else {
        throw new Error(`Błąd podczas edytowania zabiegu: ${response.status}`);
      }
    } catch (error: any) {
      console.error('Błąd podczas edytowania zabiegu:', error.response ? error.response.data : error.message);
      throw error;
    }
  };

  async delete(id: number): Promise<AxiosResponse> {
    try {
      const response = await ApiServiceInstance.sendRequestWithAuth<TherapeuticTreatment[]>('delete', '/TherapeuticTreatmentController/Remove', id);
      return response;
    } catch (error) {
      console.error('Błąd podczas usuwania elementu:', error);
      throw error;
    }
  }
}

const TherapeuticTreatmentServiceInstance = new TherapeuticTreatmentService();
export default TherapeuticTreatmentServiceInstance;