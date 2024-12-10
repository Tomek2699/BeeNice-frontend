import React, { useState, useEffect } from 'react';
import { Alert } from 'react-native';
import CustomModal from '../../Components/CustomModal';
import ReviewService from '../../services/ReviewService'
import { Review } from '@/DataModels/ReviewModel';
import ShowDateHelper from '@/helpers/showDateHelper';

type MyComponentProps = {
  visible: boolean;
  value: Review | null;
  onClose: () => void;
  onSave: (review: Review) => void;
};

const EditReviewModal: React.FC<MyComponentProps> = ({ visible, value, onClose, onSave }) => {
  const initialReviewState = { reviewDate: new Date(), familyState: '', comment: '' };
  const [review, setReview] = useState(initialReviewState)

  const handleSave = async (): Promise<void> => {
    if(value != null){
        try {
            const reviewToEdit: Review = {
              id: value.id,
              reviewDate: review.reviewDate,
              familyState: review.familyState,
              comment: review.comment,
              hiveId: value.hiveId
            };
            const response = await ReviewService.edit(reviewToEdit);
            if(response.status === 200){
              const addedReview = response.review;
              onSave(addedReview)
              onClose();
            }
          } catch (error) {
            Alert.alert('Błąd', 'Nie udało się edytować danych.');
          }
    }
  };

  const handleClose = (): void => {
    onClose();
  };

  useEffect(() => {
    if(value != null){
        setReview(value);
    }
    else{
      setReview(initialReviewState);
    }
  }, [value]); 

  return (
    <CustomModal
      visible={visible}
      title="Edytuj przegląd"
      acceptButton='Edytuj'
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

export default EditReviewModal;