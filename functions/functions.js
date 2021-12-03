const superchats = require("superchats");
require("dotenv").config();

class Funcoes {
  whatsapp = null;

  conectar() {
    new superchats.create("Marketing", {
      license: process.env.SUPER_TOKEN,
    }).then(async (client) => {
      this.whatsapp = client;

      await client.onMessage((event) => {
        console.log(event);
      });

      await client.onAck((event) => {
        console.log(event);
      });

      await client.onPresence((event) => {
        console.log(event);
      });

      await client.onDelete((event) => {
        console.log(event);
      });

      await client.forceStatusOn();
    });
  }

  enviarMensagem(message) {
    if (this.whatsapp) {
      return this.whatsapp.sendText(process.env.TEL_FONE, message.message);
    }
  }

  sendmessagebutton() {
    const buttons = [
      { buttonId: "id1", buttonText: { displayText: "Button 1" }, type: 1 },
      { buttonId: "id2", buttonText: { displayText: "Button 2" }, type: 1 },
    ];

    if (this.whatsapp) {
      this.whatsapp.sendButtons(
        process.env.TEL_FONE,
        "title of message",
        buttons,
        "Description optional"
      );
    }
  }

  logout() {
    if (this.whatsapp) {
      this.whatsapp.logout();
    }
  }
}

module.exports = new Funcoes();
