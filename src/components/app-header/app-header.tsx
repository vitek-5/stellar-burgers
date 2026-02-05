import { FC } from 'react';
import { AppHeaderUI } from '@ui';
import { useSelector } from '@store';
import { selectUser } from '@slices';

export const AppHeader: FC = () => {
  const userName = useSelector(selectUser);

  return <AppHeaderUI userName={userName?.name || ''} />;
};
