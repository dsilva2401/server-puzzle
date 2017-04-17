module.exports = function (project) {
    return function (config, db) {
        return function (req, res, next) {
            next();
        }
    }
}