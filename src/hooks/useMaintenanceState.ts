import {AppSettingsQueries} from 'src/apiv2/queries/appSettingsQueries';

const useMaintenanceState = () => {
  const {data} = AppSettingsQueries.useMaintenanceQuery();
  console.log(data?.isMaintenance);

  return {
    maintenanceData: data,
  };
};
export default useMaintenanceState;
