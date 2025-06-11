export interface Country {
    name: string;
    code: string;
    dialCode: string;
}

export interface CountryCodePickerProps {
    onSelect: (country: Country) => void;
    selectedCountry: Country;
    disabled?: boolean;
    error?: string;
} 