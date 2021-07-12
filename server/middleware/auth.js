module.exports = function (req, res, next) {
    const token = req.header('Authorization');
  
    if(!token) {
        return res.status(401).json({msg: 'No token, authorization denied'});
    }

    try {
        next();
    } catch (err) {
        res.status(401).json({msg: 'Token is not valid'})
    }
}
