import jwt from 'jsonwebtoken';
export default (req, res, next) => {
  try {
    const token = req.headers['authorization'];
    if (!token) throw new Error('No token found');
    const getToken = token.split(' ')[1];
    const decoded = jwt.verify(getToken, process.env.JWT_SECRET);
    req.authenticatedhUser = decoded;
    next();
  } catch (err) {
    const error = new Error('Not authenticated');
    error.statusCode = 401;
    next(error);
  }
};
