const isOnlyNumbers = (value: string) => value === '' || /^[0-9]+$/.test(value);
const isEmailValid = (value: string) =>
  /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/i.test(
    value.toLowerCase().trim(),
  );

export {isOnlyNumbers, isEmailValid};
