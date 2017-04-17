module.exports = function (project) {
    return function () {
        return function (req, res, next) {
            res.end('auth x');
        }
    }
}