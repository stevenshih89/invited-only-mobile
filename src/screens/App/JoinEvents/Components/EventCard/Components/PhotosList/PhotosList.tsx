import {FC} from 'react';
import {components} from '@invited-only/invited-only-api';
import * as S from './PhotosList.style';

interface PhotosListProps {
  photosList: components['schemas']['EventData']['photos'];
}

const PhotosList: FC<PhotosListProps> = ({photosList}) => {
  return (
    <>
      {!!photosList?.length && (
        <S.AdditionalPhotosContainer testID="additional-photos-container">
          {photosList?.map((item, index) => {
            return index !== 0 && item ? (
              <S.AdditionalPhoto testID="additional-photo" key={index} source={{uri: photosList[index].image}} />
            ) : null;
          })}
        </S.AdditionalPhotosContainer>
      )}
    </>
  );
};

export default PhotosList;
