import Purchases, {PurchasesPackage} from 'react-native-purchases';

const enum Offering {
  SuperInvite = 'Super Invite',
  HostSubscription = 'Host subscription',
  Pro = 'Pro',
}

const logError = (error: Error | string | unknown) => {
  console.log('[error] ', error);
};

export async function getSuperInvites(): Promise<PurchasesPackage[]> {
  try {
    const offerings = await Purchases.getOfferings();

    const products = offerings.all[Offering.SuperInvite].availablePackages;

    return products;
  } catch (error) {
    logError(error);
    throw error;
  }
}

export async function getSubscriptions(): Promise<PurchasesPackage[]> {
  try {
    const offerings = await Purchases.getOfferings();

    const products = offerings.all[Offering.HostSubscription].availablePackages;

    return products;
  } catch (error) {
    logError(error);
    throw error;
  }
}

export const getCustomerInfo = async () => {
  try {
    const customerInfo = await Purchases.getCustomerInfo();

    console.warn(JSON.stringify(customerInfo));
    console.warn(JSON.stringify(customerInfo.activeSubscriptions));
    if (typeof customerInfo.entitlements.active[Offering.Pro] === 'undefined') {
      throw 'no-subscription';
    }

    const isActiveMySubscription = customerInfo.entitlements.active[Offering.Pro].isActive;

    console.warn('isActiveMySubscription', isActiveMySubscription);

    console.warn(JSON.stringify(customerInfo));

    return isActiveMySubscription;
  } catch (error) {
    console.error('getCustomerInfo:error ', error);
    throw error;
  }
};

export const getActiveSubscription = async (): Promise<{activeSubscriptions: string[]}> => {
  try {
    const customerInfo = await Purchases.getCustomerInfo();
    console.warn('cust', customerInfo);
    const activeSubscriptions = customerInfo.activeSubscriptions;

    console.warn('activeSubscriptions', activeSubscriptions);

    if (activeSubscriptions.length > 0) {
      return customerInfo;
    } else {
      return {activeSubscriptions: []};
    }
  } catch (error) {
    console.log('error get subs', error);
    return {activeSubscriptions: []};
  }
};
