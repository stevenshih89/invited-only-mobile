import { useAppNavigation } from "./useAppNavigation";
import useUser from "hooks/user/useUser";

export const useSafetyAndWellbeing = () => {
    const navigation = useAppNavigation();

    const { user } = useUser();

    const handleNavigate = () => {
        navigation.navigate('/privacy', { screen: 'SafetyAndWellbeing', accountType: user?.accountType } as never);
    };

    return {
        handleNavigate,
    };
};
