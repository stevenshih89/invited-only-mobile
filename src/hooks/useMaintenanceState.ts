import {AppSettingsQueries} from 'src/apiv2/queries/appSettingsQueries';

const useMaintenanceState = () => {
  const {data} = AppSettingsQueries.useMaintenanceQuery();

  return {
    maintenanceData: data,
  };
};
export default useMaintenanceState;
