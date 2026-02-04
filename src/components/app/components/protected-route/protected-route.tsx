import { selectIsAuth } from '@slices';
import { ReactNode } from 'react';
import { useSelector } from '@store';
import { Navigate, Outlet } from 'react-router-dom';

type TProtectedRouteProps = {
  children: ReactNode;
  unAuth?: boolean;
};

export const ProtectedRoute = ({
  children,
  unAuth = false
}: TProtectedRouteProps) => {
  const isAuth = useSelector(selectIsAuth);

  if (unAuth) {
    // Только для НЕавторизованных
    if (isAuth) {
      return <Navigate to='/' replace />;
    }
  } else {
    // Только для авторизованных
    if (!isAuth) {
      return <Navigate to='/login' replace />;
    }
  }

  return children;
};
