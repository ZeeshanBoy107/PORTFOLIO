import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom';
import SpecialLoadingButton from './SpecialLoadingButton';
import { clearAllUserErrors, getUser, resetProfile, updateProfile } from '@/store/slices/user.slice';
import { toast } from 'react-toastify';

function UpdateProfile() {
  const { user, loading, error, isUpdated, message } = useSelector((state) => state.user)

  const [fullName, setFullName] = useState(user?.fullName || "");
  const [email, setEmail] = useState(user?.email || "");
  const [phone, setPhone] = useState(user?.phone || "");
  const [aboutMe, setAboutMe] = useState(user?.aboutMe || "");
  const [portfolioURL, setPortfolioURL] = useState(user?.portfolioURL || "");
  const [githubURL, setGithubURL] = useState(user?.githubURL || "");
  const [linkedinURL, setLinkedinURL] = useState(user?.linkedinURL || "");
  const [InstagramURL, setInstagramURL] = useState(user?.InstagramURL || "");
  const [facebookURL, setFacebookURL] = useState(user?.facebookURL || "");
  const [xURL, setXURL] = useState(user?.xURL || "");
  const [avatar, setAvatar] = useState(user?.avatar?.url || "");
  const [avatarPreview, setAvatarPreview] = useState(user?.avatar?.url || "");
  const [resume, setResume] = useState(user?.resume?.url || "");
  const [resumePreview, setResumePreview] = useState(user?.resume?.url || "");

  const dispatch = useDispatch();

  const avatarHandler = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      setAvatarPreview(reader.result);
      setAvatar(file);
    };
  };

  const resumeHandler = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      setResumePreview(reader.result);
      setResume(file);
    };
  };

  const handleUpdateProfile = () => {
    const formData = new FormData();
    formData.append("fullName", fullName);
    formData.append("email", email);
    formData.append("phone", phone);
    formData.append("aboutMe", aboutMe);
    formData.append("portfolioURL", portfolioURL);
    formData.append("linkedinURL", linkedinURL);
    formData.append("githubURL", githubURL);
    formData.append("InstagramURL", InstagramURL);
    formData.append("facebookURL", facebookURL);
    formData.append("xURL", xURL);
    formData.append("avatar", avatar);
    formData.append("resume", resume);

    dispatch(updateProfile(formData));
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
    console.log(message);
    if (message) {
      toast.success(message);
    }
  }, [dispatch, error, message, isUpdated])

  return (
    <>
      <div className="w-full h-full">
        <div>
          <div className="grid w-[100%] gap-6">
            <div className="grid gap-2">
              <h1 className="text-3xl font-bold">Update Profile</h1>
              <p className="mb-5">Update Your Profile</p>
            </div>
          </div>
          <div className="grid gap-6">
            <div className="flex items-start lg:justify-between lg:items-center flex-col lg:flex-row gap-5">
              <div className="grid gap-2 w-full sm:w-72">
                <Label>Profile Image</Label>
                <img
                  src={avatarPreview}
                  alt="avatar"
                  className="w-full h-auto sm:w-72 sm:h-72 rounded-2xl"
                />
                <div className="relative">
                  <input
                    type="file"
                    className="avatar-update-btn"
                    onChange={avatarHandler}
                  />
                </div>
              </div>
              <div className="grid gap-2 w-full sm:w-72">
                <Label>Resume</Label>
                <Link to={user?.resume?.url} target="_blank">
                  <img
                    src={resumePreview}
                    alt="resume"
                    className="w-full h-auto sm:w-72 sm:h-72 rounded-2xl"
                  />
                </Link>

                <div className="relative">
                  <input
                    type="file"
                    className="avatar-update-btn"
                    onChange={resumeHandler}
                  />
                </div>
              </div>
            </div>
            <div className="grid gap-2">
              <Label>Full Name</Label>
              <Input
                type="text"
                value={fullName}
                placeholder="Your Full Name"
                onChange={(e) => setFullName(e.target.value)}
              />
            </div>
            <div className="grid gap-2">
              <Label>Email</Label>
              <Input
                type="email"
                value={email}
                placeholder="Your Email"
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="grid gap-2">
              <Label>Phone</Label>
              <Input
                type="text"
                value={phone}
                placeholder="Your Phone Number"
                onChange={(e) => setPhone(e.target.value)}
              />
            </div>
            <div className="grid gap-2">
              <Label>About Me</Label>
              <Textarea
                value={aboutMe}
                placeholder="About Me"
                onChange={(e) => setAboutMe(e.target.value)}
              />
            </div>
            <div className="grid gap-2">
              <Label>Portfolio URL</Label>
              <Input
                type="text"
                value={portfolioURL}
                placeholder="Your Portfolio Url"
                onChange={(e) => setPortfolioURL(e.target.value)}
              />
            </div>
            <div className="grid gap-2">
              <Label>Github URL</Label>
              <Input
                type="text"
                value={githubURL}
                placeholder="Your Github URL"
                onChange={(e) => setGithubURL(e.target.value)}
              />
            </div>
            <div className="grid gap-2">
              <Label>Linkedin URL</Label>
              <Input
                type="text"
                value={linkedinURL}
                placeholder="Your LinkedIn URL"
                onChange={(e) => setLinkedinURL(e.target.value)}
              />
            </div>
            <div className="grid gap-2">
              <Label>Insta URL</Label>
              <Input
                type="text"
                value={InstagramURL}
                placeholder="Your Insta URL"
                onChange={(e) => setInstagramURL(e.target.value)}
              />
            </div>
            <div className="grid gap-2">
              <Label>Facebook URL</Label>
              <Input
                type="text"
                value={facebookURL}
                placeholder="Your Facebook URL"
                onChange={(e) => setFacebookURL(e.target.value)}
              />
            </div>
            <div className="grid gap-2">
              <Label>X URL</Label>
              <Input
                type="text"
                value={xURL}
                placeholder="Your X(Twitter) URL"
                onChange={(e) => setXURL(e.target.value)}
              />
            </div>
            <div className="grid gap-2">
              {!loading ? (
                <Button className="w-full" onClick={handleUpdateProfile}>
                  Update Profile
                </Button>
              ) : (
                <SpecialLoadingButton content={"Updating"} />
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default UpdateProfile