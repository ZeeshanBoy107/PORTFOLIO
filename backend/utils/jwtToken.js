export const generateToken = (user) => {
  const token = user.generateJWT();
  res
  .cookie("token", token, {
    httpOnly: true,
    expires: new Date(Date.now() + process.env.COOKIE_EXPIRE * 24 * 60 *60 * 1000),
    sameSite: "None",
    secure: true
  })

  return token;
}