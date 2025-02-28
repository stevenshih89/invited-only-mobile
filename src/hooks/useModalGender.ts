import {UserMutations} from "../apiv2/mutations/userMutations.ts";

export const useModalGender = ({setShowGender, setActiveGenderItem}: {
    setShowGender: any;
    setActiveGenderItem: any;
}) => {
  const {mutate: updateUserGenderMutation} = UserMutations.useUserUpdateGender();
  const {mutate: updateUserShowGenderInProfileMutation} = UserMutations.useUserUpdateShowGenderInProfile();

  const handleUpdateShowInMyProfile = async (state: string): Promise<void> => {
    updateUserShowGenderInProfileMutation({
      state: state,
      changeShowGenderState: () => {
        setShowGender(state);
      }
    })
  };

  const handleUpdateGender = async (gender: string): Promise<void> => {
    updateUserGenderMutation({
      gender: gender,
      changeActiveGenderItem: () => {
        setActiveGenderItem(gender);
      }
    })
  };
  return {
    handleUpdateShowInMyProfile,
    handleUpdateGender
  }
}
