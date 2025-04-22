import MaleGenderIcon from 'assets/images/icons/gender.svg';
import FemaleGenderIcon from 'assets/images/icons/female-gender.svg';

export const useGenderSpecs = (gender: 'man' | 'woman' | 'other') => {
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
