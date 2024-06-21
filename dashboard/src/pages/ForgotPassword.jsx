import { clearAllForgotPasswordrErrors, forgotPassword } from '@/store/slices/forgotResetPassword.slice';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import SpecialLoadingButton from './sub-components/SpecialLoadingButton';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const { loading, error, message } = useSelector((state) => state.forgotPassword);

  const { isAuthenticated } = useSelector((state) => state.user);

  const dispatch = useDispatch();

  const navigateTo = useNavigate();

  const handleForgotPassword = () => {
    dispatch(forgotPassword(email));
  }

  useEffect(() => {
    if(error){
      toast.error(error);
      dispatch(clearAllForgotPasswordrErrors())
    }

    if(isAuthenticated) {
      navigateTo("/");
    }

    if(message !== null) {
      toast.success("Email Sent");
    }
  }, [dispatch, isAuthenticated, error, loading])
  
  return (
    <div className="w-full lg:grid lg:min-h-[100vh] lg:grid-cols-2 xl:min-h-[100vh]">
      <div className="min-h-[100vh] flex items-center justify-center py-12">
        <div className="mx-auto grid w-[350px] gap-6">
          <div className="grid gap-2 text-center">
            <h1 className="text-3xl font-bold">Forgot Password</h1>
            <p className="text-balance text-muted-foreground">
              Enter your email below to request for password reset
            </p>
          </div>
          <div className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                type="email"
                placeholder="m@example.com"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="grid gap-2">
              <div className="flex items-center">
                <Link
                  to={"/login"}
                  className="ml-auto inline-block text-sm underline"
                >
                  Remembered your Password?
                </Link>
              </div>
            </div>

            {loading ? (
              <SpecialLoadingButton content={"Requesting"} />
            ) : (
              <Button
                type="submit"
                onClick={handleForgotPassword}
                className="w-full"
              >
                Reset Password Request
              </Button>
            )}
          </div>
        </div>
      </div>
      <div className="hidden bg-muted lg:block">
        <img
          src="https://static.vecteezy.com/system/resources/previews/035/333/333/original/forget-password-icon-unknown-password-icon-forgot-password-solid-icon-design-illustration-vector.jpg"
          alt="Image"
          className='w-full h-full'
        />
      </div>
    </div>
  );
}

export default ForgotPassword