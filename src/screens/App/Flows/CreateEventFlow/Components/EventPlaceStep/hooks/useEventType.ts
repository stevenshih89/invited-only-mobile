import {useState} from 'react';
import Sports from 'assets/images/interests/sports.png';
import Festivals from 'assets/images/interests/festivals.png';
import Yachts from 'assets/images/interests/yachts.png';
import VipTables from 'assets/images/interests/vip-tables.png';
import Concerts from 'assets/images/interests/concerts.png';
import Fashion from 'assets/images/interests/fashion.png';
import Bars from 'assets/images/interests/bars.png';
import Business from 'assets/images/interests/business.png';
import Restaurants from 'assets/images/interests/restaurants.png';
import PoolParties from 'assets/images/interests/pool-parties.png';
import Private from 'assets/images/interests/private.png';
import Exclusive from 'assets/images/interests/exclusive.png';
import BeachParties from 'assets/images/interests/beach-parties.png';
import Nightclubs from 'assets/images/interests/nightclubs.png';
import LiveShows from 'assets/images/interests/live-shows.png';
import Brunches from 'assets/images/interests/brunches.png';

export interface EventType {
    id: number;
    title: string;
    image: any;
}

export const useEventType = () => {
    const [listOfEventTypes] = useState<EventType[]>([
        {id: 0, title: 'Sports', image: Sports},
        {id: 1, title: 'Festivals', image: Festivals},
        {id: 2, title: 'Yachts', image: Yachts},
        {id: 3, title: 'VIP Tables', image: VipTables},
        {id: 4, title: 'Concerts', image: Concerts},
        {id: 5, title: 'Fashion', image: Fashion},
        {id: 6, title: 'Bars', image: Bars},
        {id: 7, title: 'Business', image: Business},
        {id: 8, title: 'Restaurants', image: Restaurants},
        {id: 9, title: 'Pool Parties', image: PoolParties},
        {id: 10, title: 'Private', image: Private},
        {id: 11, title: 'Exclusive', image: Exclusive},
        {id: 12, title: 'Beach Parties', image: BeachParties},
        {id: 13, title: 'Nightclubs', image: Nightclubs},
        {id: 14, title: 'Live Shows', image: LiveShows},
        {id: 15, title: 'Brunches', image: Brunches},
    ]);
    const [activeEventType, setActiveEventType] = useState<EventType | null>(null);

    const handleSelectEventType = (eventType: EventType) => {
        setActiveEventType(eventType);
    };

    return {listOfEventTypes, activeEventType, handleSelectEventType};
};
