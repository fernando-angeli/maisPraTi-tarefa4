const pages = {
  home: "./content/home/home.html",
  about: "./content/about/about.html",
  advantages: "./content/advantages/advantages.html",
  contact: "./content/contact/contact.html",
};

function request(url) {
  document.getElementById("content").innerHTML = "";

  // const loaderModel = `<div class="d-flex justify-content-center align-itens-center">
  //   <div class="spinner-border" role="status">
  //     <span class="visually-hidden"></span>
  //   </div>
  // </div>`;

  // if (!document.getElementById("loading")) {
  //   const loader = document.createElement("div");
  //   loader.innerHTML = loaderModel;
  //   document.getElementById("content").appendChild(loader);
  // }

  let ajax = new XMLHttpRequest();

  ajax.open("GET", pages[url]);

  ajax.onreadystatechange = () => {
    if (ajax.readyState == 4 && ajax.status == 200) {
      document.getElementById("content").innerHTML = ajax.responseText;
    }
    if (ajax.readyState == 4 && ajax.status == 404) {
      document.getElementById("content").innerHTML =
        "Requisição finalizada, porém o recurso não foi encontrado. Erro 404.";
    }
  };

  setTimeout(() => {
    ajax.send();
  }, 100);
}

document.addEventListener("DOMContentLoaded", function () {
  request("home");
});
