import { useUser } from "src/store/userStore";
import { useAppNavigation } from "./useAppNavigation";
import { privacyPath } from "constants/pathLocations";

export const useSafetyAndWellbeing = () => {
    const navigation = useAppNavigation();
    
    const user = useUser((i: any) => i?.user);

    const handleNavigate = () => {
    navigation.navigate(privacyPath, {screen: 'SafetyAndWellbeing', accountType: user.accountType} as never);
    };

    return {
        handleNavigate,
    }
}