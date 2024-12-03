
import { useRouter } from 'expo-router';

export const useRouting = () => {
  const router = useRouter();

  const handleOpenHives = (apairyId: number) => {
    router.push({
      pathname: '/hives',
      params: { apiaryId: apairyId.toString() },
    });
  };

  return { handleOpenHives };
};
