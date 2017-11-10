module.exports = function () {
  // Add your custom middleware here. Remember, that
  // in Express the order matters, `notFound` and
  // the error handler have to go last.
  const app = this;

  app.use(function(req, res, next) {
          console.log("middleware");
          req.feathers.fromMiddleware = 'Hello world';
          req.feathers.headers= req.headers;
          next();
  })
};
