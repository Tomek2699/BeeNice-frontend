import { Apiary } from '@/DataModels/ApiaryModel';
import { useRouter } from 'expo-router';

export const useRouting = () => {
  const router = useRouter();

  const handleOpenHives = (apairyId: number) => {
    router.push({
      pathname: '/hives',
      params: { apiaryId: apairyId.toString() },
    });
  };

  const handleOpenManageApiary = (apiary: Apiary | undefined) => {
    // if(apiary){
    //   const serializedData = JSON.stringify(apiary);
    //   router.push({
    //   pathname: '/(apiaryViews)/manageView/manageApiary',
    //   params: { apiaryObject: serializedData },
    // });
    // }
    // else{
    //   router.push('/(apiaryViews)/manageView/manageApiary');
    // }
  };

  return { handleOpenHives, handleOpenManageApiary };
};
