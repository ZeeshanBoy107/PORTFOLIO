export const generateToken = (user, res) => {
  const token = user.generateJWT();
  res
  .cookie("token", token, {
    httpOnly: true,
    sameSite: "None",
    secure: true
  })
  .json({
    success: true,
    user,
    token
  });
}