import React, { useMemo, useCallback, forwardRef } from 'react';
import { BottomSheetModal } from '@gorhom/bottom-sheet';
import { components } from '@invited-only/invited-only-api';
import * as S from './ModalReport.style';
import { useReport } from './hooks/useReport';
import FakeOrScamIcon from 'assets/images/icons/fake-or-scam.svg';
import SmileyBadIcon from 'assets/images/icons/smiley-bad.svg';
import EditPdfIcon from 'assets/images/icons/edit-pdf.svg';
import CheckupInfectionIcon from 'assets/images/icons/checkup-infection.svg';
import UnderageIcon from 'assets/images/icons/underage.svg';
import DownDislikeIcon from 'assets/images/icons/thumb-down-dislike.svg';
import ReportRoundedIcon from 'assets/images/icons/report-rounded.svg';
import { whiteColor } from 'constants/colors';

interface ModalReportProps {
  setModalReport?: (visible: boolean) => void;
  uidSender?: string;
  uid?: string;
  handleAutoSwipeLeft?: () => void;
}

interface ReportItem {
  id: number;
  title: string;
  icon: React.ElementType;
  reason: components['schemas']['BlockUserPayload']['reason'];
}

const ModalReport = forwardRef<BottomSheetModal, ModalReportProps>(({ setModalReport, uidSender, uid, handleAutoSwipeLeft }, ref) => {
  const snapPoints = useMemo(() => ['50%', '90%'], []);

  const { handleSendReport } = useReport({
    uidSender,
    uid,
    handleAutoSwipeLeft,

    setModalReport: () => {
      if (ref && 'current' in ref && ref.current) {
        ref.current.dismiss();
      }
      if (setModalReport) setModalReport(false);
    },
  });
  const listOfReports: ReportItem[] = [
    {
      id: 1,
      title: 'Fake or scam event',
      icon: FakeOrScamIcon,
      reason: 'fake-profile',
    },
    {
      id: 2,
      title: 'Host behavior concerns',
      icon: SmileyBadIcon,
      reason: 'off-io-behavior',
    },
    {
      id: 3,
      title: 'Inappropriate content',
      icon: EditPdfIcon,
      reason: 'inappropriate-content',
    },
    {
      id: 4,
      title: 'Identity-based hate',
      icon: CheckupInfectionIcon,
      reason: 'identify-based-hate',
    },
    {
      id: 5,
      title: 'Illegal or unsafe activity',
      icon: ReportRoundedIcon,
      reason: 'off-io-behavior',
    },
    {
      id: 6,
      title: 'Underage',
      icon: UnderageIcon,
      reason: 'underage',
    },
    {
      id: 7,
      title: 'I am just not interested',
      icon: DownDislikeIcon,
      reason: 'not-interested'
    },
  ];

  const handleDismiss = useCallback(() => {
    if (setModalReport) {
      setModalReport(false);
    }
  }, [setModalReport]);


  return (
    <BottomSheetModal
      ref={ref}
      index={0}
      snapPoints={snapPoints}
      enablePanDownToClose={true}
      onDismiss={handleDismiss}
      backgroundComponent={S.ModalBackground}
      handleIndicatorStyle={{
        backgroundColor: whiteColor,
      }}>
      <S.Wrapper>
        <S.TextReport>Block and Report</S.TextReport>
        <S.ReportList
          data={listOfReports}
          keyExtractor={(item: ReportItem) => item.id.toString()}
          scrollEnabled={false}
          showsVerticalScrollIndicator={false}
          ItemSeparatorComponent={() => <S.Separator />}
          renderItem={({ item }: { item: ReportItem }) => {
            const Icon = item.icon;
            return (
              <S.ReportButton onPress={() => handleSendReport(item.reason)}>
                <S.IconWrapper>
                  <Icon height={32} />
                </S.IconWrapper>
                <S.ReportText>{item.title}</S.ReportText>
              </S.ReportButton>
            );
          }}
        />
        <S.ButtonWrapper>
          <S.StyledButton onPress={() => handleSendReport('other')} title="Send" />
        </S.ButtonWrapper>
      </S.Wrapper>
    </BottomSheetModal>
  );
});

ModalReport.displayName = 'ModalReport';

export default ModalReport;
