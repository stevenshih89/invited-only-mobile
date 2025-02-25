import { Dispatch, SetStateAction } from "react";

export const useModalBirthday = ({setMonth, setDay, setYear}: {
    setMonth: Dispatch<SetStateAction<string>>;
    setDay: Dispatch<SetStateAction<string>>;
    setYear: Dispatch<SetStateAction<string>>;
}) => {
    const handleMonthChange = (input: string): void => {
        const numericInput = input.replace(/[^0-9]/g, '');
        const trimmedInput = numericInput.slice(0, 2);
        const monthInt = parseInt(trimmedInput, 10);
    
        if (trimmedInput.length === 2 && (monthInt < 1 || monthInt > 12)) {
          return;
        }
        setMonth(trimmedInput);
      };
    
      const handleDayChange = (input: string): void => {
        const numericInput = input.replace(/[^0-9]/g, '');
        const trimmedInput = numericInput.slice(0, 2);
        const dayInt = parseInt(trimmedInput, 10);
    
        if (trimmedInput.length === 2 && (dayInt < 1 || dayInt > 31)) {
          return;
        }
    
        setDay(trimmedInput);
      };
    
      const handleYearChange = (input: string) => {
        const numericInput = input.replace(/[^0-9]/g, '');
        const trimmedInput = numericInput.slice(0, 4);
        const currentYear = new Date().getFullYear();
        const yearInt = parseInt(trimmedInput, 10);
    
        if (trimmedInput.length === 4 && (yearInt < 1900 || yearInt > currentYear)) {
          return;
        }
    
        setYear(trimmedInput);
      };
    
    return {
        handleMonthChange,
        handleDayChange,
        handleYearChange
    }
}