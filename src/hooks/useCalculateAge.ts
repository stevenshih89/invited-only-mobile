const useCalculateAge = (birthdate: string) => {
  if (!birthdate || !/^\d{2}\.\d{2}\.\d{4}$/.test(birthdate)) {
    return '';
  }

  const parts = birthdate.split('.');
  const formattedBirthdate = `${parts[2]}-${parts[0]}-${parts[1]}`;

  const today = new Date();
  const birthDate = new Date(formattedBirthdate);
  let age = today.getFullYear() - birthDate.getFullYear();
  const m = today.getMonth() - birthDate.getMonth();

  if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }

  console.warn(age);

  return age.toString();
};

export default useCalculateAge;
