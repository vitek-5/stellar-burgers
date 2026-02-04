// src/components/app/app.tsx
import {
  ConstructorPage,
  Feed,
  Login,
  Register,
  ForgotPassword,
  ResetPassword,
  Profile,
  ProfileOrders,
  NotFound404
} from '@pages';
import '../../index.css';
import styles from './app.module.css';
import { AppHeader } from '@components';
import {
  createBrowserRouter,
  Outlet,
  RouterProvider,
  useLocation,
  useNavigate,
  useParams
} from 'react-router-dom';
import { Modal } from '../modal';
import { OrderInfo, IngredientDetails } from '@components';
import { ProtectedRoute } from './components/protected-route/protected-route';
import { useDispatch } from '@store';
import { useEffect } from 'react';
import { getUserApi } from '@api';
import { getUserThunk } from '@slices';

const AppLayout = () => {
  const location = useLocation();
  const background = location.state?.background;
  const navigate = useNavigate();

  return (
    <>
      <AppHeader />
      <Outlet />

      {background && location.pathname.startsWith('/feed') && (
        <Modal title='Детали заказа' onClose={() => navigate(-1)}>
          <OrderInfo />
        </Modal>
      )}

      {background && location.pathname.startsWith('/ingredients') && (
        <Modal title='Детали ингридиента' onClose={() => navigate(-1)}>
          <IngredientDetails />
        </Modal>
      )}

      {background && location.pathname.startsWith('/profile/orders') && (
        <Modal title='Детали заказа' onClose={() => navigate(-1)}>
          <OrderInfo />
        </Modal>
      )}
    </>
  );
};

const router = createBrowserRouter([
  {
    element: <AppLayout />,
    children: [
      { path: '/', element: <ConstructorPage /> },
      { path: '/feed', element: <Feed /> },
      { path: '/feed/:number', element: <Feed /> },
      { path: '/ingredients/:id', element: <ConstructorPage /> },
      {
        path: '/login',
        element: (
          <ProtectedRoute unAuth>
            <Login />
          </ProtectedRoute>
        )
      },
      {
        path: '/register',
        element: (
          <ProtectedRoute unAuth>
            <Register />
          </ProtectedRoute>
        )
      },
      {
        path: '/forgot-password',
        element: (
          <ProtectedRoute unAuth>
            <ForgotPassword />
          </ProtectedRoute>
        )
      },
      {
        path: '/reset-password',
        element: (
          <ProtectedRoute unAuth>
            <ResetPassword />
          </ProtectedRoute>
        )
      },
      {
        path: '/profile',
        element: (
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        )
      },
      {
        path: '/profile/orders',
        element: (
          <ProtectedRoute>
            <ProfileOrders />
          </ProtectedRoute>
        )
      },
      {
        path: '/profile/orders/:number',
        element: (
          <ProtectedRoute>
            <ProfileOrders />
          </ProtectedRoute>
        )
      },
      { path: '*', element: <NotFound404 /> }
    ]
  }
]);

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUserThunk());
  }, [dispatch]);

  return (
    <div className={styles.app}>
      <RouterProvider router={router} />
    </div>
  );
};

export default App;
