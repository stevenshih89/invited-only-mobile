import Purchases, {PurchasesPackage} from 'react-native-purchases';

const enum Offering {
  SuperInvite = 'Super Invite',
  HostSubscription = 'Host subscription',
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
