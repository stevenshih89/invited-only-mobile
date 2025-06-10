import ManageEventCollapsible from "./Components/ManageEvent/ManageEventCollapsible/ManageEventCollapsible";
import * as S from './NewEventsScreen.style';

const NewEventsScreen = () => {
    return <S.Container>
        <ManageEventCollapsible
            toggle={() => { }}
            title="Your Events"
            eventRequests={[]}
            isOpen={false}
            onPressTooltip={() => { }}
        />
        <ManageEventCollapsible
            toggle={() => { }}
            title="Events You're Invited To"
            eventRequests={[]}
            isOpen={false}
            onPressTooltip={() => { }}
        />
    </S.Container>
}

export default NewEventsScreen;