import {FC} from 'react';
import * as S from './PhotosList.style';

interface PhotosListProps {
  photosList: string[];
}

const PhotosList: FC<PhotosListProps> = ({photosList}) => {
  return (
    <>
      {!!photosList?.length && (
        <S.AdditionalPhotosContainer>
          {photosList?.map((item, index) => {
            return index !== 0 && item ? <S.AdditionalPhoto key={index} source={{uri: photosList[index]}} /> : null;
          })}
        </S.AdditionalPhotosContainer>
      )}
    </>
  );
};

export default PhotosList;
