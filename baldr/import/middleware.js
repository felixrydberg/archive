function checkNotAuth(req, res, next) {
  if (req.isAuthenticated()) {
    return res.redirect('/');
  }
  next();
}

function checkAuth(req, res, next) {
  if (!req.isAuthenticated()) {
    return res.redirect('/');
  }
  next();
}

function checkAdmin(req, res, next) {
  if (req.user[0].admin !== 1) {
    res.status(401);
    return res.send('Not allowed');
  }
  next();
}

export default { checkAdmin, checkAuth, checkNotAuth };
