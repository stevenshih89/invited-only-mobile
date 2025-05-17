import { useEffect } from "react";
import { useNavigationStore } from "src/store/navigationStore";

export const useUpdateActiveChatScreen = () => {
    const { setCurrentRoute, setIsChatScreen } = useNavigationStore();

    useEffect(() => {
        setCurrentRoute('Chat');
        setIsChatScreen(true);
        return () => {
            setIsChatScreen(false);
        };
    }, []);

};