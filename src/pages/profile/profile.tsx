import { FC, SyntheticEvent, useEffect, useState } from 'react';
import { selectUser, updateUserThunk } from '@slices';
import { useDispatch, useSelector } from '@store';
import { ProfileUI } from '@ui-pages';

export const Profile: FC = () => {
  const userSelector = useSelector(selectUser);
  const dispatch = useDispatch();

  const user = {
    name: userSelector?.name || '',
    email: userSelector?.email || ''
  };

  const [formValue, setFormValue] = useState({
    name: user.name,
    email: user.email,
    password: ''
  });

  useEffect(() => {
    setFormValue({
      name: userSelector?.name || '',
      email: userSelector?.email || '',
      password: ''
    });
  }, [userSelector]);

  const isFormChanged =
    formValue.name !== (userSelector?.name || '') ||
    formValue.email !== (userSelector?.email || '') ||
    !!formValue.password;

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    dispatch(updateUserThunk(formValue));
  };

  const handleCancel = (e: SyntheticEvent) => {
    e.preventDefault();
    setFormValue({
      name: userSelector?.name || '',
      email: userSelector?.email || '',
      password: ''
    });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormValue((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value
    }));
  };

  return (
    <ProfileUI
      formValue={formValue}
      isFormChanged={isFormChanged}
      handleCancel={handleCancel}
      handleSubmit={handleSubmit}
      handleInputChange={handleInputChange}
    />
  );
};
