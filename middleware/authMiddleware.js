import HttpError from "../errors/httpError.js";
import { getUserByUsername } from "../services/usersService.js";



async function authMiddleware(req, res, next) {
  try {
    const { username, password } = req.headers;

    if (!username || !password) {
      throw new HttpError("must include a username and password.", 400);
    }

    const user = await getUserByUsername(username);

    if (!user) {
      throw new HttpError("user does not exist", 401);
    }

    if (user.password !== password) {
      throw new HttpError("username or password is incorrect.", 401);
    }

    next();
  } catch (error) {
    next(error);
  }
}

export default authMiddleware;
