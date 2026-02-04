// src/components/protected-route/protected-route.tsx
import { selectIsAuth } from '@slices';
import { ReactNode } from 'react';
import { useSelector } from '@store'; // ← исправлен импорт
import { Navigate, Outlet } from 'react-router-dom'; // ← исправлен импорт

type TProtectedRouteProps = {
  children: ReactNode;
  unAuth?: boolean; // ← необязательный параметр
};

export const ProtectedRoute = ({
  children,
  unAuth = false
}: TProtectedRouteProps) => {
  const isAuth = useSelector(selectIsAuth);

  if (unAuth) {
    // Только для НЕавторизованных
    if (isAuth) {
      return <Navigate to='/' replace />; // ← на главную, а не в профиль
    }
  } else {
    // Только для авторизованных
    if (!isAuth) {
      return <Navigate to='/login' replace />;
    }
  }

  return children; // ← возвращаем children, а не Outlet
};
