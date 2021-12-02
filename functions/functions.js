const superchats = require("superchats");
require("dotenv").config();

class Funcoes {
  conectar() {
    new superchats.create("Marketing", {
      license: process.env.SUPER_TOKEN,
    }).then(async (client) => {
      await client.onMessage(async (message) => {
        console.log(message.content);
      });
    });
  }

  enviarMensagem() {
    /*
    new superchats.create("Marketing", {
      license:
        "asjdh-efddff734-sdsdf834-233272",
    })
      .then((client) =>
        client.sendText("5555555555555", "Thanks for using Superchats!!!")
      )

      .catch((erro) => {
        console.log(erro);
      });
      */
    /*
    new superchats.create("Marketing", {
      license:
        "asjdh-efddff734-sdsdf834-233272",
      welcomeScreen: false,
      logQr: false,
    }).then(async (client) => {
      await client.sendText("5555555555555", "Thanks for using Superchats!!!");
    });
    */

    new superchats.create("Marketing", {
      license: "asjdh-efddff734-sdsdf834-233272",
    }).then(async (MarketingClient) => {
      await MarketingClient.onMessage(async (message) => {
        if (message.type == "text") {
          console.log(message);
        }
      });

      /*
        let response = await MarketingClient.sendText(
          "5555555555555",
          "Thanks for using Superchats!!!"
        );
        */
    });
  }
}

module.exports = new Funcoes();
