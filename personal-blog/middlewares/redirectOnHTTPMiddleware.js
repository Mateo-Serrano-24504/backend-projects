export const redirectMiddleware = (req, res, next) => {
    if (req.secure) {
        next();
    } else {
        res.redirect(`https://localhost:443${req.url}`)
    }
}