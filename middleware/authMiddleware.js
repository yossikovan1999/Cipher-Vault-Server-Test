import HttpError from "../errors/httpError.js";
import { getByUsername} from "../services/usersService.js";

async function authMiddleware(req, res, next) {
  try {
    const { username, password } = req.body;

    if(!username || !password){
      throw new HttpError("must include a username and password.", 400);
    }
    
    // const [data] = await getByUsername(username);
    
    if(!data || data.password !== password){
        throw new HttpError("username or password is incorrect.", 401);
    }

    next();
    
  } catch (error) {
    next(error);
  }
}

export default authMiddleware;
