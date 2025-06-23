import React, { useEffect } from 'react';
import * as S from './MapLoader.style';
import { useRingAnimations } from './hooks/useRingAnimations';
import DubaiCircleMap from 'src/assets/images/app/dubai-circle.png'

const MapLoader = () => {
    const { ring1AnimatedStyle, ring2AnimatedStyle } = useRingAnimations();
    useEffect(() => {
        return () => {
            console.log('unmount');
        };
    }, []);

    return (
        <S.Container>
            <S.DubaiMapImage source={DubaiCircleMap} />
            <S.RingContainer>
                <S.Ring style={ring1AnimatedStyle} />
                <S.Ring style={ring2AnimatedStyle} />
            </S.RingContainer>
        </S.Container>
    );
};

export default MapLoader;