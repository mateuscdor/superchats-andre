export function esconderNotificacao(origem) {
  let notificacoes = document.querySelectorAll(".notification-contact");

  notificacoes.forEach((element) => {
    element.style.visibility = "hidden";
  });
}
