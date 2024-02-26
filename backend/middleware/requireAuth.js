import jwt from 'jsonwebtoken';
import User from '../models/userModel.js';


export default async function requireAuth(req, res, next) {

  const { authorization } = req.headers;

  if (!authorization || authorization === undefined) {
    res.status(401).json({error: 'Authentication token required'});
  }

  const token = authorization.split(' ')[1];

  try {
    const user_id = jwt.verify(token, process.env.SECRET);

    req.user = await User.findById(user_id).select('_id');

    next();

  } catch (error) {
    res.status(401).json({error: 'Request is not authorized'});
  }
}