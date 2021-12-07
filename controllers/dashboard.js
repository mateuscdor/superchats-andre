module.exports = (app) => {
  app.get("/dashboard", function (req, res) {
    res.render("pages/dashboard");
  });
};
