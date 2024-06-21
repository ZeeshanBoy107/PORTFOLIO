import React, { useEffect, useState } from 'react'
import SpecialLoadingButton from './sub-components/SpecialLoadingButton';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { useDispatch, useSelector } from 'react-redux';
import { clearAllForgotPasswordrErrors, resetPassword } from '@/store/slices/forgotResetPassword.slice';
import { toast } from 'react-toastify';

function ResetPassword() {

  const { token } = useParams();
  
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const {loading, error, message} = useSelector((state) => state.forgotPassword);

  const {isAuthenticated} = useSelector((state) => state.user);

  const dispatch = useDispatch();
  const navigateTo = useNavigate();


  const handleResetPassword = () => {
    dispatch(resetPassword(token, password, confirmPassword))
  }

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearAllForgotPasswordrErrors());
    }

    if (isAuthenticated) {
      navigateTo("/");
    }

    if (message !== null) {
      toast.success("Password Reset Done");
    }
  }, [dispatch, isAuthenticated, error, loading]);

  return (
    <>
      <div className="w-full lg:grid lg:min-h-[100vh] lg:grid-cols-2 xl:min-h-[100vh]">
        <div className="min-h-[100vh] flex items-center justify-center py-12">
          <div className="mx-auto grid w-[350px] gap-6">
            <div className="grid gap-2 text-center">
              <h1 className="text-3xl font-bold">Forgot Password</h1>
              <p className="text-balance text-muted-foreground">
                Set a New Password
              </p>
            </div>
              <div className="grid gap-2">
                <div className="flex items-center">
                  <Label>Password</Label>
                </div>
                <Input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>

              <div className="grid gap-2">
                <div className="flex items-center">
                  <Label>Confirm Password</Label>
                </div>
                <Input
                  type="password"
                  required
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
              </div>

              {loading ? (
                <SpecialLoadingButton content={"Resetting Password"} />
              ) : (
                <Button
                  type="submit"
                  onClick={handleResetPassword}
                  className="w-full"
                >
                  Reset Password
                </Button>
              )}
            </div>
          </div>
        </div>
        <div className="hidden bg-muted lg:block">
          <img src="/placeholder.svg" alt="Image" />
        </div>
    </>
  );
}

export default ResetPassword