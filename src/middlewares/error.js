module.exports = function(error, req, res, next) {
    //log exception and save to db
    res.status(500).send('Something failed.')
}