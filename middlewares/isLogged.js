const isLoggedIn = redirectTo => (req,res,next) => {
  if(req.user) return next();
  req.flash('error','No tienes acceso');
  req.session.returnTo = req.url;
  res.redirect(redirectTo);
}

const isLoggedOut = redirectTo => (req,res,next) => {
  if(!req.user) return next();
  req.flash('error','Ya estás logeado');
  delete req.session.returnTo;
  res.redirect(redirectTo);
}

module.exports = {
  isLoggedIn,
  isLoggedOut
}