import { Dispatch, SetStateAction } from 'react';
import { Review } from '@/DataModels/ReviewModel';
import { Alert, LayoutAnimation  } from 'react-native';
import ReviewService from '@/services/ReviewService';

export interface Props {
  setReviews: Dispatch<SetStateAction<Review[]>>;
}

export const useCrud = ({ setReviews } : Props) => {

  const handleAddReview = (review: Review) => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setReviews((prevReviews) => [...prevReviews, review]);
  };

  const handleEditReview = (review: Review) => {
    setReviews((prevReviews) => 
      prevReviews.map(item => item.id === review.id ? review : item)
    );
  };

  const handleDeleteReview = async (id: number) => {
    Alert.alert(
      'Usuń element',
      'Czy na pewno chcesz usunąć ten element?',
      [
        { text: 'Anuluj', style: 'cancel' },
        {
          text: 'Usuń',
          style: 'destructive',
          onPress: async () => {
            try {
              const response = await ReviewService.delete(id);
              if (response.status === 200) {
                LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
                setReviews((reviews) => reviews.filter((item) => item.id !== id));
              } else {
                Alert.alert('Błąd', 'Nie udało się usunąć elementu. Spróbuj ponownie.');
              }
            } catch (error) {
              console.error('Błąd usuwania elementu:', error);
              Alert.alert('Błąd', 'Nie udało się usunąć elementu.');
            }
          },
        },
      ],
    );
  }

  return {
    handleAddReview,
    handleEditReview,
    handleDeleteReview,
  };
};
