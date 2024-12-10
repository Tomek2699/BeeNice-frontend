import { useState, useEffect } from 'react';
import { Review } from '@/DataModels/ReviewModel';
import ReviewService from '@/services/ReviewService';
import { Alert } from 'react-native';

interface Props {
  params: {
    hiveId?: string | string[];
    [key: string]: unknown;
  };
}

export const useData = ({params} : Props) => {
  const [hiveId, setHiveId] = useState<number | undefined>();
  const [reviews, setReviews] = useState<Review[]>([]);
  const [filteredReviews, setFilteredReviews] = useState<Review[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const getData = async (): Promise<void> => {
    setIsLoading(true);
    try {
      const response = await ReviewService.getItems(hiveId);
      if(response.status === 200){
        const downloadedReviews = response.reviews;
        setReviews(downloadedReviews);
      }
    } catch (error) {
      Alert.alert('Błąd', 'Nie udało się pobrać danych.');
    }
    finally{
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const hiveIdParam = params.hiveId;
    const id = Array.isArray(hiveIdParam) ? hiveIdParam[0] : hiveIdParam;
    const parsedId = Number(id);

    if (!isNaN(parsedId)) {
      setHiveId(parsedId);
    } else {
      console.error('Invalid hiveId:', hiveIdParam);
    }
  }, [params]);

  useEffect(() => {
    if (hiveId !== undefined) {
      getData();
    }
  }, [hiveId]);

  return {
    hiveId,
    reviews,
    filteredReviews,
    setReviews,
    setFilteredReviews,
    isLoading,
  };
};
