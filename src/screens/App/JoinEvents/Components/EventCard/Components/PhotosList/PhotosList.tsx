import {FC} from 'react';
import * as S from './PhotosList.style';
import {components} from 'src/api/v1';

interface PhotosListProps {
  photosList: components['schemas']['EventData']['photos'];
}

const PhotosList: FC<PhotosListProps> = ({photosList}) => {
  return (
    <>
      {!!photosList?.length && (
        <S.AdditionalPhotosContainer>
          {photosList?.map((item, index) => {
            return index !== 0 && item ? <S.AdditionalPhoto key={index} source={{uri: photosList[index].image}} /> : null;
          })}
        </S.AdditionalPhotosContainer>
      )}
    </>
  );
};

export default PhotosList;
