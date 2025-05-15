import MaleGenderIcon from 'src/assets/images/icons/gender.svg';
import FemaleGenderIcon from 'src/assets/images/icons/female-gender.svg';

export const useGenderSpecs = (gender: 'man' | 'woman' | 'other' | undefined) => {
  if (!gender) {
    return {
      genderIcon: null,
      genderText: null,
    };
  }

  const getGenderIcon = () =>
    (
      ({
        man: MaleGenderIcon,
        woman: FemaleGenderIcon,
      }) as any
    )[gender];

  const getGenderText = () =>
    ({
      man: 'He (His)',
      woman: 'She (Her)',
      other: 'They (Their)',
    })[gender];

  const genderIcon = getGenderIcon();
  const genderText = getGenderText();

  return {
    genderIcon,
    genderText,
  };
};
