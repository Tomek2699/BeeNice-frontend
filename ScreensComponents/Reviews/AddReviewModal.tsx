import React, { useState } from 'react';
import { Alert } from 'react-native';
import CustomModal from '../../Components/CustomModal';
import ReviewService from '../../services/ReviewService'
import { Review } from '@/DataModels/ReviewModel';
import ShowDateHelper from '@/helpers/showDateHelper';

type MyComponentProps = {
  visible: boolean;
  hiveId: number | undefined;
  onClose: () => void;
  onSave: (review: Review) => void;
};

const AddReviewModal: React.FC<MyComponentProps> = ({ visible, hiveId, onClose, onSave }) => {
  const initialReviewState = { reviewDate: new Date(), familyState: '', comment: '' };
  const [review, setReview] = useState(initialReviewState)

  const handleSave = async (): Promise<void> => {
    try {
      const response = await ReviewService.save(review.reviewDate, review.familyState, review.comment, hiveId);
      if(response.status === 200){
        const addedReview = response.review;
        onSave(addedReview)
        setReview(initialReviewState);
        onClose();
      }
    } catch (error) {
      Alert.alert('Błąd', 'Nie udało się zapisać danych.');
    }
  };

  const handleClose = (): void => {
    setReview(initialReviewState);
    onClose();
  };

  return (
    <CustomModal
      visible={visible}
      title="Dodaj przegląd"
      acceptButton='Zapisz'
      inputs={[
        {
          title: 'Data',
          placeholder: 'Wpisz datę',
          value: ShowDateHelper.formatDateToISOString(review.reviewDate),
          onChange: (e) => setReview({ ...review, reviewDate: new Date(e)}),
          isDatePicker: true
        },
        {
          title: 'Stan',
          placeholder: 'Wpisz stan',
          value: review.familyState,
          onChange: (e) => setReview({ ...review, familyState: e}),
        },
        {
          title: 'Komentraz',
          placeholder: 'Wpisz komentarz',
          value: review.comment,
          onChange: (e) => setReview({ ...review, comment: e}),
        },
      ]}
      onClose={handleClose}
      onSubmit={handleSave}
    />
  );
};

export default AddReviewModal;