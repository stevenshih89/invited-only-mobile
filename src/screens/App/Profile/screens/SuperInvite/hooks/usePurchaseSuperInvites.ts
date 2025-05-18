import Purchases from "react-native-purchases";
import { useState } from "react";
import useUpdateUser from "hooks/user/useUpdateUser";
import useGetUserById from "hooks/useGetUserById";
import { useAuthStore } from "src/store/authStore";



const usePurchaseSuperInvites = () => {
    const { update } = useUpdateUser();
    const { userMetadata } = useAuthStore();
    const { data: existingUser } = useGetUserById(userMetadata?.uid);
    const [isLoading, setIsLoading] = useState(false);

    const purchaseSuperInvites = async (superInvites: number) => {
        setIsLoading(true);
        const offerings = await Purchases.getOfferings();
        const superInvitesOfferings = offerings.all['Super Invite'].availablePackages;

        const product = superInvitesOfferings.find((product) => product.identifier === `Super Invite ${superInvites}`);

        if (product) {
            await Purchases.purchasePackage(product);
        }
        const newSuperInvites = existingUser?.superInvites ? existingUser?.superInvites + superInvites : superInvites;

        update({
            ...existingUser,
            superInvites: newSuperInvites,
        });
        setIsLoading(false);
    }

    return { purchaseSuperInvites, isLoading };

};

export default usePurchaseSuperInvites;
