import {FC} from 'react';
import * as S from './ProfilePhotosList.style';

interface PhotosListProps {
  photosList: string[];
}

const PhotosList: FC<PhotosListProps> = ({photosList}) => {
  if (!photosList?.length) return null;

  return (
    <S.AdditionalPhotosContainer testID="additional-photos-container">
      {photosList?.slice(1).map((item, index) => {
        return item && <S.AdditionalPhoto key={index} source={{uri: item}} testID="additional-photo" />;
      })}
    </S.AdditionalPhotosContainer>
  );
};

export default PhotosList;
