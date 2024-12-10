import { ApiServiceInstance } from './ApiService';
import { Review } from '../DataModels/ReviewModel';
import { AxiosResponse } from 'axios';

interface ReviewsResponse {
    reviews: Review[];
    status: number;
}

interface ReviewResponse {
  review: Review;
  status: number;
}

class ReviewService {

  async getItems(hiveId: number | undefined): Promise<ReviewsResponse> {
    try {
      if(hiveId === undefined){
        throw new Error(`Błąd podczas pobierania hiveId`);
      }

      const response = await ApiServiceInstance.sendRequestWithAuth<Review[]>('get', '/ReviewController/GetReviews', hiveId);
      const reviews: Review[] = response.data.map((item: any) => ({
        id: item.id,
        reviewDate: new Date(item.reviewDate),
        familyState: item.familyState,
        comment: item.comment,
        hiveId: item.hiveId,
      }));
      
      if (response.status === 200) {
        return {
            reviews,
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

  async save (reviewDate: Date, familyState: string, comment: string, hiveId: number | undefined) : Promise<ReviewResponse> {
    try {
      if(hiveId === undefined){
        throw new Error('Brak hiveId');
      }

      const response = await ApiServiceInstance.sendRequestWithAuth<Review>('post', '/ReviewController/Save', { reviewDate: reviewDate, familyState: familyState, 
        comment: comment, hiveId: hiveId});
      const review: Review = {
        id: response.data.id,
        reviewDate: new Date(response.data.reviewDate),
        familyState: response.data.familyState,
        comment: response.data.comment,
        hiveId: response.data.hiveId
      }

      if (response.status === 200) {
        return {
            review,
            status: response.status,
          };
      } 
      else {
        throw new Error(`Błąd podczas dodawania przeglądu: ${response.status}`);
      }
    } catch (error: any) {
      console.error('Błąd podczas dodawania przeglądu:', error.response ? error.response.data : error.message);
      throw error;
    }
  };

  async edit (editedReview: Review) : Promise<ReviewResponse> {
    try {
      const response = await ApiServiceInstance.sendRequestWithAuth<Review>('put', '/ReviewController/Update', { id: editedReview.id, reviewDate: editedReview.reviewDate, 
        familyState: editedReview.familyState, comment: editedReview.comment, hiveId: editedReview.hiveId});
      const review: Review = {
        id: response.data.id,
        reviewDate: new Date(response.data.reviewDate),
        familyState: response.data.familyState,
        comment: response.data.comment,
        hiveId: response.data.hiveId
      }

      if (response.status === 200) {
        return {
            review,
            status: response.status,
          };
      } 
      else {
        throw new Error(`Błąd podczas edytowania przeglądu: ${response.status}`);
      }
    } catch (error: any) {
      console.error('Błąd podczas edytowania przeglądu:', error.response ? error.response.data : error.message);
      throw error;
    }
  };

  async delete(id: number): Promise<AxiosResponse> {
    try {
      const response = await ApiServiceInstance.sendRequestWithAuth<Review[]>('delete', '/ReviewController/Remove', id);
      return response;
    } catch (error) {
      console.error('Błąd podczas usuwania elementu:', error);
      throw error;
    }
  }
}

const ReviewServiceInstance = new ReviewService();
export default ReviewServiceInstance;