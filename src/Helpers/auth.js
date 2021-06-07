import jwt from 'jsonwebtoken';

export const getUserIDFromToken = (rawToken) => {
  if (!rawToken || rawToken === '') {
    return null;
  }
  const token = rawToken.split(' ')[1];
  let decodedToken;
  try {
    decodedToken = jwt.verify(token, process.env.TOKEN_SECRET);
    return decodedToken.userId;
  } catch (err) {
    decodedToken = null;
  }
  return decodedToken;
};
