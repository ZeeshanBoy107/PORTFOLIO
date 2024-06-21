export const generateToken = (user) => {
  const token = user.generateJWT();

  return token;
}