import React, { useState, useRef, useEffect } from 'react';
import { Animated, Modal } from 'react-native';
import type { Country, CountryCodePickerProps } from './types';
import { countries } from './countries.ts';
import {
    Container,
    Button,
    Flag,
    DialCode,
    ErrorText,
    ModalOverlay,
    DropdownContainer,
    HeaderContainer,
    CloseButton,
    CloseButtonText,
    SearchInput,
    CountryList,
    CountryItem,
    CountryFlag,
    CountryName,
    CountryDialCode,
} from './CountryCodePicker.styles';
import ArrowDownIcon from 'src/assets/images/icons/arrow-down.svg'


// Default to UAE
const DEFAULT_COUNTRY: Country = {
    name: 'United Arab Emirates',
    code: 'AE',
    dialCode: '+971',
};

export const getCountryFlag = (countryCode: string): string => {
    const codePoints = countryCode
        .toUpperCase()
        .split('')
        .map(char => 127397 + char.charCodeAt(0));
    return String.fromCodePoint(...codePoints);
};

const CountryCodePicker: React.FC<CountryCodePickerProps> = ({
    onSelect,

    selectedCountry = DEFAULT_COUNTRY,
    disabled = false,
    error,
}) => {
    const [isDropdownVisible, setIsDropdownVisible] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const dropdownAnimation = useRef(new Animated.Value(0)).current;

    const filteredCountries = countries.filter((country: Country) =>
        country.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        country.dialCode.includes(searchQuery)
    );

    useEffect(() => {
        Animated.timing(dropdownAnimation, {
            toValue: isDropdownVisible ? 1 : 0,
            duration: 200,
            useNativeDriver: true,
        }).start();
    }, [isDropdownVisible, dropdownAnimation]);

    const handleSelectCountry = (country: Country) => {
        onSelect(country);
        setIsDropdownVisible(false);
        setSearchQuery('');
    };

    const renderItem = ({ item, index }: { item: Country, index: number }) => (
        <CountryItem onPress={() => handleSelectCountry(item)} key={`${item.code}-${item.name}-index-${index}`}>
            <CountryFlag>{getCountryFlag(item.code)}</CountryFlag>
            <CountryName>{item.name}</CountryName>
            <CountryDialCode>{item.dialCode}</CountryDialCode>
        </CountryItem>
    );

    return (
        <Container>
            <Button
                onPress={() => !disabled && setIsDropdownVisible(true)}
                disabled={disabled}
                error={!!error}
            >
                <Flag>{getCountryFlag(selectedCountry.code)}</Flag>
                <DialCode>{selectedCountry.dialCode}</DialCode>
                <ArrowDownIcon />
            </Button>

            {error && <ErrorText>{error}</ErrorText>}

            <Modal
                visible={isDropdownVisible}
                transparent
                animationType="fade"
                onRequestClose={() => setIsDropdownVisible(false)}
            >
                <ModalOverlay onPress={() => setIsDropdownVisible(false)}>
                    <DropdownContainer
                        style={{
                            transform: [{
                                translateY: dropdownAnimation.interpolate({
                                    inputRange: [0, 1],
                                    outputRange: [20, 0],
                                }),
                            }],
                            opacity: dropdownAnimation,
                        }}
                    >
                        <HeaderContainer>
                            <CloseButton onPress={() => setIsDropdownVisible(false)}>
                                <CloseButtonText>✕</CloseButtonText>
                            </CloseButton>
                            <SearchInput
                                placeholderTextColor="rgba(118, 118, 118, 1)"
                                placeholder="Country / Region"
                                value={searchQuery}
                                onChangeText={setSearchQuery}
                            />
                        </HeaderContainer>
                        <CountryList
                            data={filteredCountries}
                            renderItem={renderItem}
                            keyExtractor={(item: Country, index: number) => `${item.code}-${item.name}-index-${index}`}
                            keyboardShouldPersistTaps="handled"
                        />
                    </DropdownContainer>
                </ModalOverlay>
            </Modal>
        </Container>
    );
};

export default CountryCodePicker; 