import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { clearAllUserErrors, login } from "@/store/slices/user.slice";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import SpecialLoadingButton from "./sub-components/SpecialLoadingButton";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const {loading, isAuthenticated, error} = useSelector(state => state.user)

  const dispatch = useDispatch();
  const navigateTo = useNavigate();

  const handleLogin = () => {
    dispatch(login(email, password))
  }

  useEffect(() => {
    if(error) {
      toast.error(error);
      dispatch(clearAllUserErrors)
    }

    if(isAuthenticated) {
      navigateTo("/")
    }
  }, [dispatch, isAuthenticated, error, loading])
  return (
    <div className="w-full lg:grid lg:min-h-[100vh] lg:grid-cols-2 xl:min-h-[100vh]">
      <div className="min-h-[100vh] flex items-center justify-center py-12">
        <div className="mx-auto grid w-[350px] gap-6">
          <div className="grid gap-2 text-center">
            <h1 className="text-3xl font-bold">Login</h1>
            <p className="text-balance text-muted-foreground">
              Enter your email below to login to your account
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
                <Label htmlFor="password">Password</Label>
                <Link
                  to={"/password/forgot"}
                  className="ml-auto inline-block text-sm underline"
                >
                  Forgot your password?
                </Link>
              </div>
              <Input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            {loading ? (
              <SpecialLoadingButton content={"Logging in"} />
            ) : (
              <Button type="submit" onClick={handleLogin} className="w-full">
                Login
              </Button>
            )}
          </div>
        </div>
      </div>
      <div className="hidden bg-muted lg:block">
        <img
          src="https://c8.alamy.com/comp/2FK073J/computer-and-account-login-and-password-olor-line-icon-pictogram-for-web-page-mobile-app-promo-ui-ux-gui-design-element-editable-stroke-2FK073J.jpg"
          alt="Image"
          className="w-full h-full"
        />
      </div>
    </div>
  );
}

export default Login;
