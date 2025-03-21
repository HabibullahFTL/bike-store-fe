import { Button } from '@/components/ui/button';
import { logout, selectAuth } from '@/redux/features/auth/authSlice';
import { useAppSelector } from '@/redux/hooks';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import ChangePasswordDialog from './change-password';

const ProfilePage = () => {
  const dispatch = useDispatch();
  const { user } = useAppSelector(selectAuth);

  const [showChangePasswordDialog, setShowChangePasswordDialog] =
    useState(false);

  const handleShowPasswordDialog = () => {
    setShowChangePasswordDialog((status) => !status);
  };

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <div className="max-w-md my-20 mx-auto p-6 bg-white rounded-2xl shadow-lg border border-gray-200">
      <h2 className="text-2xl font-semibold text-gray-800 text-center mb-4">
        Profile
      </h2>

      <table className="w-full border-collapse">
        <tbody>
          <tr className="border-b">
            <td className="p-3 font-medium text-gray-700">Name</td>
            <td className="p-3 text-gray-900 capitalize">{user?.name}</td>
          </tr>
          <tr className="border-b">
            <td className="p-3 font-medium text-gray-700">Email</td>
            <td className="p-3 text-gray-900">{user?.email}</td>
          </tr>
          <tr className="border-b">
            <td className="p-3 font-medium text-gray-700">Role</td>
            <td className="p-3">
              <span className="bg-gray-100 capitalize text-gray-800 px-3 py-1 rounded-md text-sm font-medium">
                {user?.role}
              </span>
            </td>
          </tr>
        </tbody>
      </table>

      <div className="mt-6 text-center flex gap-2 justify-center">
        <Button
          variant={'outline'}
          className="border-red-500 hover:bg-red-500 cursor-pointer text-red-500 hover:text-white"
          onClick={handleShowPasswordDialog}
        >
          Change Password
        </Button>
        <Button
          className="bg-red-500 hover:bg-red-600 cursor-pointer"
          onClick={handleLogout}
        >
          Logout
        </Button>
      </div>
      <ChangePasswordDialog
        showChangePasswordDialog={showChangePasswordDialog}
        setShowChangePasswordDialog={setShowChangePasswordDialog}
      />
    </div>
  );
};

export default ProfilePage;
