const functions = require("../functions/functions");

module.exports = (app) => {
  app.get("/logout", function (req, res) {
    functions.logout();
    res.redirect("/");
  });

  app.post("/conectar", function (req, res) {
    //console.log(req.query);

    functions.conectar();

    res.redirect("/home");
  });

  app.get("/home", function (req, res) {
    res.render("pages/section");
  });

  app.get("/", function (req, res) {
    res.render("pages/login");
  });

  app.post("/", function (req, res) {
    console.log(req.body);
    //res.redirect("/home");
    let email = req.body.email;
    let password = req.body.password;

    if (email.length && password.length) {
      if (email == "andre@andre" && password == "123") {
        res.redirect("/home");
      } else {
        res.redirect("/?erro=" + "nao foi possivel altenticar");
      }
    } else {
      res.redirect("/?erro=" + "preencha todos os campos");
    }
  });
};
