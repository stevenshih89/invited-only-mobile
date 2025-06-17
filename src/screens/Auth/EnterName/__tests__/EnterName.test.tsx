import React from 'react';
import {render, fireEvent, waitFor} from '@testing-library/react-native';
import EnterName from '../EnterName';
import {mockedNavigateFunction} from 'jest/mocks/appNavigation.mock';
import {AuthContext} from 'contexts/AuthContext';

describe('EnterName Component', () => {
    it('renders correctly', () => {
        const {getByText} = render(
            <AuthContext.Provider
                value={{
                    onBoarding: [],
                    setOnBoarding: jest.fn(),
                    setUser: jest.fn(),
                    user: {},
                }}>
                <EnterName />
            </AuthContext.Provider>,
        );
        expect(getByText("What's your first name?")).toBeTruthy();
    });

    it('handles next button press correctly', async () => {
        const {getByTestId} = render(
            <AuthContext.Provider
                value={{
                    onBoarding: [],
                    setOnBoarding: jest.fn(),
                    setUser: jest.fn(),
                    user: {},
                }}>
                <EnterName />
            </AuthContext.Provider>,
        );
        const nameInput = getByTestId('name-input');
        const nextButton = getByTestId('continue-button');

        fireEvent.changeText(nameInput, 'John');
        fireEvent.press(nextButton);

        await waitFor(() => {
            expect(mockedNavigateFunction).toHaveBeenCalledWith(expect.anything());
        });
    });
});
