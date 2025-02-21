import {device} from 'detox'
import auth from './__mocks__/@react-native-firebase/auth';


describe('Example', () => {
  beforeAll(async () => {
    await device.launchApp({ permissions: {
      userTracking: 'YES'
    },
    newInstance: true});
    
    auth.mockImplementation(() => ({
      signInWithPhoneNumber: jest.fn(() => Promise.resolve({
        confirm: jest.fn(() => Promise.resolve({ user: { uid: 'mockUserId' } })),
      })),
    }));
    debugger;
  });

  it('Start registration flow', async () => {
    
    await waitFor(element(by.text('Get Access'))).toBeVisible();
    await element(by.text('Get Access')).tap();
    await element(by.text('Create Account')).tap();
    const elementButton = element(by.id('accept-button'))

    await elementButton.getAttributes().then((value) => {
      console.log(value);
    });

    
    await element(by.id('eula-scroll')).scrollTo('bottom');

    
    await element(by.id('bottom-view')).tap();

    device.generateViewHierarchyXml().then((value) => {
      console.log(value);
    })
    
    
    await waitFor(element(by.id('phone-input'))).toBeVisible();

    await element(by.id('phone-input')).typeText('1234567890');
    


    // // Mock a delay for the code to arrive
    // await new Promise((resolve) => setTimeout(resolve, 3000));

    // // Enter the verification code
    // await element(by.id('verification-code-input')).typeText('123456');

    // // Tap the "Verify" button
    // await element(by.text('Verify')).tap();


    //     // Fill phone number (assuming the input has testID 'phone-number-input')
    //     await element(by.id('phone-input')).typeText('+1234567890');
    
    //     // // Tap the "Send Code" button (assuming it has testID 'send-code-button')
    //     // await element(by.id('send-code-button')).tap();
    
    //     // // Mock a delay for the code to arrive
    //     // await new Promise((resolve) => setTimeout(resolve, 3000));
    
    //     // // Enter the verification code
    //     // await element(by.id('verification-code-input')).typeText('123456');
    
    //     // // Tap the "Verify" button
    //     // await element(by.text('Verify')).tap();
    
    //     // // Wait for the next screen to appear (assuming it navigates after successful login)
    //     // await waitFor(element(by.text('Welcome'))).toBeVisible().withTimeout(5000);

    
  });

});
