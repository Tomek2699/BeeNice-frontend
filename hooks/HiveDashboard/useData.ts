import { useState, useEffect } from 'react';
import { Hive } from '@/DataModels/HiveModel';

interface Props {
  params: {
    hiveObject?: string | string[];
    [key: string]: unknown;
  };
}

export const useData = ({params} : Props) => {
  const [hive, setHive] = useState<Hive | undefined>();

  useEffect(() => {
    if (typeof params.hiveObject === 'string') {
      const parsedHive = JSON.parse(params.hiveObject);
      setHive(parsedHive);
    }
  }, [params.hiveObject]);

  return {
    hive,
  };
};
