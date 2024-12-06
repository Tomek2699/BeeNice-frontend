import { useState, useEffect } from 'react';
import { Queen } from '@/DataModels/QueenModel';
import QueenService from '@/services/QueenService';
import { Alert } from 'react-native';

interface Props {
  params: {
    hiveId?: string | string[];
    [key: string]: unknown;
  };
}

export const useData = ({params} : Props) => {
  const [hiveId, setHiveId] = useState<number | undefined>();
  const [queens, setQueens] = useState<Queen[]>([]);
  const [filteredQueens, setFilteredQueens] = useState<Queen[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const getData = async (): Promise<void> => {
    setIsLoading(true);
    try {
      const response = await QueenService.getItems(hiveId);
      if(response.status === 200){
        const downloadedQueens = response.queens;
        setQueens(downloadedQueens);
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
    queens,
    filteredQueens,
    setQueens,
    setFilteredQueens,
    isLoading,
  };
};
