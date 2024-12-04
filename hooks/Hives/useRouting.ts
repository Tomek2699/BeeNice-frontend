
import { Hive } from '@/DataModels/HiveModel';
import { useRouter } from 'expo-router';

export const useRouting = () => {
  const router = useRouter();

  const handleOpenDashboard = (hive: Hive) => {
    const serializedData = JSON.stringify(hive);
    router.push({
      pathname: '/dashboard',
      params: { hiveObject: serializedData },
    });
  };

  return { handleOpenDashboard };
};
