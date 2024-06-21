import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import React, { useEffect, useState } from 'react'
import SpecialLoadingButton from './SpecialLoadingButton';
import { Button } from '@/components/ui/button';
import { useDispatch, useSelector } from 'react-redux';
import { clearAllUserErrors, getUser, resetProfile, updatePassword } from '@/store/slices/user.slice';
import { toast } from 'react-toastify';

function UpdatePassword() {

  const { user, loading, error, message, isUpdated } = useSelector((state) => state.user);

  const [currentPassword, setCurrentPassowrd] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");

  const dispatch = useDispatch();

  const handleUpdatePassword = () => {
    dispatch(updatePassword(currentPassword, newPassword, confirmNewPassword));
  }

  useEffect( () => {
    if (error) {
      toast.error(error);
      dispatch(clearAllUserErrors());
    }

    if (isUpdated) {
      dispatch(getUser());
      dispatch(resetProfile());
    }
    if (message) {
      toast.success(message);
    }
  }, [dispatch, isUpdated, error, message])


  return (
    <>
      <div className="w-full h-full">
        <div>
          <div className="grid w-[100%] gap-6">
            <div className="grid gap-2">
              <h1 className="text-3xl font-bold">Update Password</h1>
              <p className="mb-5">Update Your Dashboard Password</p>
            </div>
          </div>
          <div className="grid gap-6">
            <div className="flex items-start lg:justify-between lg:items-center flex-col lg:flex-row gap-5">
              <div className="grid gap-2">
                <Label>Current Password</Label>
                <Input
                  type="password"
                  value={currentPassword}
                  placeholder="Current Password"
                  onChange={(e) => setCurrentPassowrd(e.target.value)}
                />
              </div>
              <div className="grid gap-2">
                <Label>New Password</Label>
                <Input
                  type="password"
                  value={newPassword}
                  placeholder="New Password"
                  onChange={(e) => setNewPassword(e.target.value)}
                />
              </div>
              <div className="grid gap-2">
                <Label>Confirm New Password</Label>
                <Input
                  type="password"
                  value={confirmNewPassword}
                  placeholder="Confirm New Password"
                  onChange={(e) => setConfirmNewPassword(e.target.value)}
                />
              </div>
              <div className="grid gap-2">
                {!loading ? (
                  <Button className="w-full" onClick={handleUpdatePassword}>
                    Update Password
                  </Button>
                ) : (
                  <SpecialLoadingButton content={"Updating"} />
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default UpdatePassword