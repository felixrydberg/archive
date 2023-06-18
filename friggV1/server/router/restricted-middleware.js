module.exports = (req, res, next) => {
    if(req.session && req.session.user) {
        next();
    } else res.status(200).send({ status: 'error', message: 'You need to be authenticated to access this page', action: 'redirect', target: '/'});
}