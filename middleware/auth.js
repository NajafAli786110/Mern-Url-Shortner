import { getUser } from "../services/auth.js";

async function restrictToLoggedInUserOnly(req, res, next) {
  const userUid = req.cookies?.uid;

  if (!userUid) {
    console.log("Not Cookie");
    return res.redirect("/login");
  }

  const user = getUser(userUid);

  if (!user) {
    console.log("Not User");
    return res.redirect("/login");
  }

  req.currUser = user;

  next();
}

async function checkAuth(req, res, next) {
  const userUid = req.cookies?.uid;

  const user = getUser(userUid);
  req.currUser = user;

  next();
}

export { restrictToLoggedInUserOnly, checkAuth };
