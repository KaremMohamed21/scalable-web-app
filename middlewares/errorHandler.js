exports.notFound = (req, res, next) => {
    res.status(404).send("Page not found");
    next();
}

exports.errorHandler = (err, req, res, next) => {
    console.log(err);
    res.status(500).send('Something broke. What did you do?');
}