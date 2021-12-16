export function mensagensInternas() {
  let mensagensInternas = document.querySelector(".mensagens-internas");

  mensagensInternas.addEventListener("click", function () {
    let teste = mensagensInternas.style.color;
    console.log(teste);
    if (mensagensInternas.style.color == "") {
      mensagensInternas.style.backgroundColor = "#1C98DA";
      mensagensInternas.style.color = "#fff";
      mensagensInternas.style.borderRadius = "6px";
    } else {
      mensagensInternas.style.backgroundColor = "";
      mensagensInternas.style.color = "";
      mensagensInternas.style.borderRadius = "";
    }
  });
}
