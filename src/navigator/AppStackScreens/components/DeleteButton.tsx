import { useContext } from "react";
import { DeleteModalContext } from "../AppStackScreens";
import * as S from "./DeleteButton.style";

const DeleteButton = () => {
    const [_isDeleteEventModalVisible, setDeleteEventModalVisible] = useContext(DeleteModalContext) || [false, () => { }];

    return (
        <S.Container
            onPress={() => setDeleteEventModalVisible(true)}
            activeOpacity={0.7}
        >
            <S.Text>Delete</S.Text>
        </S.Container>
    );
};

export default DeleteButton;