import AE from 'src/assets/images/flags/ae.svg';
import ES from 'src/assets/images/flags/es.svg';
import UA from 'src/assets/images/flags/ua.svg';
import FR from 'src/assets/images/flags/fr.svg';
import PL from 'src/assets/images/flags/pl.svg';
import IL from 'src/assets/images/flags/il.svg';
import PT from 'src/assets/images/flags/pt.svg';
import US from 'src/assets/images/flags/us.svg';
import GB from 'src/assets/images/flags/uk.svg';
import DE from 'src/assets/images/flags/de.svg';
import IT from 'src/assets/images/flags/it.svg';

export type CountryCode = 'AE' | 'ES' | 'UA' | 'FR' | 'PL' | 'IL' | 'PT' | 'US' | 'UK' | 'DE' | 'IT';

const Flags = ({countryCode}: {countryCode: CountryCode}) => {
  switch (countryCode) {
    case 'AE':
      return <AE />;
    case 'ES':
      return <ES />;
    case 'UA':
      return <UA />;
    case 'FR':
      return <FR />;
    case 'PL':
      return <PL />;
    case 'IL':
      return <IL />;
    case 'PT':
      return <PT />;
    case 'US':
      return <US />;
    case 'UK':
      return <GB />;
    case 'DE':
      return <DE />;
    case 'IT':
      return <IT />;
    default:
      return null;
  }
};

export default Flags;
