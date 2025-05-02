import React, {FC} from 'react';
import * as S from './ModalReport.style';
import {useReport} from './hooks/useReport';
import FakeOrScamIcon from 'assets/images/icons/fake-or-scam.svg';
import SmileyBadIcon from 'assets/images/icons/smiley-bad.svg';
import EditPdfIcon from 'assets/images/icons/edit-pdf.svg';
import CheckupInfectionIcon from 'assets/images/icons/checkup-infection.svg';
import UnderageIcon from 'assets/images/icons/underage.svg';
import DownDislikeIcon from 'assets/images/icons/thumb-down-dislike.svg';
import ReportRoundedIcon from 'assets/images/icons/report-rounded.svg';
import Button from 'components/Button/Button';

interface ModalReportProps {
  modalReport?: boolean;
  setModalReport?: any;
  uidSender?: string;
  uid?: string;
  handleAutoSwipeLeft?: () => void;
}

interface ReportItem {
  id: number;
  title: string;
  icon: React.ElementType;
}

const ModalReport: FC<ModalReportProps> = ({modalReport, setModalReport, uidSender, uid, handleAutoSwipeLeft}) => {
  const {activeReport, handleChangeReport, handleSendReport} = useReport({
    uidSender,
    uid,
    handleAutoSwipeLeft,
    setModalReport,
  });
  const listOfReports: ReportItem[] = [
    {
      id: 1,
      title: 'Fake or scam event',
      icon: FakeOrScamIcon,
    },
    {
      id: 2,
      title: 'Host behavior concerns',
      icon: SmileyBadIcon,
    },
    {
      id: 3,
      title: 'Inappropriate content',
      icon: EditPdfIcon,
    },
    {
      id: 4,
      title: 'Identity-based hate',
      icon: CheckupInfectionIcon,
    },
    {
      id: 5,
      title: 'Illegal or unsafe activity',
      icon: ReportRoundedIcon,
    },
    {
      id: 6,
      title: 'Underage',
      icon: UnderageIcon,
    },
    {
      id: 7,
      title: 'I am just not interested',
      icon: DownDislikeIcon,
    },
  ];

  return (
    <S.StyledModal
      isVisible={modalReport}
      useNativeDriver={false}
      propagateSwipe={true}
      backdropColor={'rgba(0, 0, 0, 0.94)'}
      testID={'bottom-half-modal-open-button'}
      onBackdropPress={() => setModalReport(false)}
      onSwipeComplete={() => setModalReport(false)}
      swipeDirection={['down']}>
      <S.Wrapper>
        <S.WhiteLine />
        <S.TextReport>Block and Report</S.TextReport>
        <S.ReportList
          data={listOfReports}
          keyExtractor={(item: ReportItem) => item.id.toString()}
          scrollEnabled={false}
          showsVerticalScrollIndicator={false}
          ItemSeparatorComponent={() => <S.Separator />}
          renderItem={({item}: {item: ReportItem}) => {
            const isActive = activeReport === item.title;
            const Icon = item.icon;
            return (
              <S.ReportButton active={isActive} onPress={() => handleChangeReport(item.title)}>
                <S.IconWrapper active={isActive}>
                  <Icon height={32} />
                </S.IconWrapper>
                <S.ReportText>{item.title}</S.ReportText>
              </S.ReportButton>
            );
          }}
        />
        <S.ButtonWrapper>
          <S.StyledButton onPress={() => handleSendReport(activeReport)} title="Send" />
        </S.ButtonWrapper>
      </S.Wrapper>
    </S.StyledModal>
  );
};

export default ModalReport;
