import { useEffect, useState } from 'react';

export const useFlipped= (isVisibleSuperInvite: boolean) => {
  const [flipped, setFlipped] = useState(false);

  useEffect(() => {
    if (isVisibleSuperInvite) {
      setFlipped(false);
    }
  }, [isVisibleSuperInvite]);

  return { flipped, setFlipped };
};
