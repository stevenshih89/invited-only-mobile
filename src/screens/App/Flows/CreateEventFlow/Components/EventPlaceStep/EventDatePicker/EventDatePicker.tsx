import { useState } from 'react';
import DatePicker from 'react-native-date-picker';
import { useFormikContext } from 'formik';
import { components } from '@invited-only/invited-only-api';
import * as S from './EventDatePicker.styled';
import { formatDate, parseStringToDate } from 'helpers/genericDateFormater';


export const getDateString = (date: Date) => {
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  const year = String(date.getFullYear()).slice(-2);
  return `${month}/${day}/${year}`;
};

const EventDatePicker = () => {
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);
  const { errors, values, touched, setFieldValue } = useFormikContext<Partial<components['schemas']['EventData']>>();
  return (
    <S.RowContainer>
      <S.HalfFieldContainer>
        <S.FieldLabel>Date *</S.FieldLabel>
        <S.Input onPress={() => setShowDatePicker(true)}>
          <S.StyledTextInput
            placeholder="MM/DD/YY"
            placeholderTextColor="#767676"
            value={getDateString(values.date ? new Date(values.date) : new Date())}
            editable={false}
            pointerEvents="none"
          />
        </S.Input>
        {touched.date && errors.date && <S.ErrorText>{errors.date}</S.ErrorText>}

        <DatePicker
          open={showDatePicker}
          onCancel={() => {
            setShowDatePicker(false);
          }}
          modal
          date={parseStringToDate(values.date) || new Date()}
          mode="date"

          onConfirm={date => {
            setFieldValue('date', date);
            setShowDatePicker(false);
          }}
        />
      </S.HalfFieldContainer>

      {/* Hour Field */}
      <S.HalfFieldContainer>
        <S.FieldLabel>Hour *</S.FieldLabel>
        <S.Input onPress={() => setShowTimePicker(true)}>
          <S.StyledTextInput placeholder="00:00" placeholderTextColor="#767676" value={values.hour} editable={false} pointerEvents="none" />
        </S.Input>
        {touched.hour && errors.hour && <S.ErrorText>{errors.hour}</S.ErrorText>}
        <DatePicker
          open={showTimePicker}
          modal
          date={parseStringToDate(values.date) || new Date()}
          mode="time"
          onConfirm={hour => {
            setFieldValue('hour', `${hour.getHours()}:${hour.getMinutes()}`);
            setShowTimePicker(false);
          }}
        />
      </S.HalfFieldContainer>
    </S.RowContainer>
  );
};
export default EventDatePicker;
