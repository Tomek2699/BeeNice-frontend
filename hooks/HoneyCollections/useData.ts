import { useState, useEffect, Dispatch, SetStateAction } from 'react';
import { HoneyCollection } from '@/DataModels/HoneyCollectionModel';
import HoneyCollectionService from '@/services/HoneyCollectionService';
import { Alert } from 'react-native';

interface Props {
  params: {
    hiveId?: string | string[];
    [key: string]: unknown;
  };
  setHoneyCollections: Dispatch<SetStateAction<HoneyCollection[]>>;
}

export const useData = ({params, setHoneyCollections} : Props) => {
  const [hiveId, setHiveId] = useState<number | undefined>();
  //const [honeyCollections, setHoneyCollections] = useState<HoneyCollection[]>([]);
  const [filteredHoneyCollections, setFilteredHoneyCollections] = useState<HoneyCollection[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const getData = async (): Promise<void> => {
    setIsLoading(true);
    try {
      const response = await HoneyCollectionService.getItems(hiveId);
      if(response.status === 200){
        const downloadedHoneyCollections = response.honeyCollections;
        setHoneyCollections(downloadedHoneyCollections);
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
    filteredHoneyCollections,
    setFilteredHoneyCollections,
    isLoading,
  };
};
