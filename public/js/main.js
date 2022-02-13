const socket = io.connect();

//socket on para el  chat___------------------------//

let hoy = new Date();

socket.on("mensajeDesdeServidor", (msjs) => {
  const mensajesHTML = msjs
    .map(
      (msj) =>
        `<span style="color:blue; font-weight:bold"> ${
          msj.nameChat
        }</span> -> <span style="color:brown"> [${hoy.getDate()}/${hoy.getMonth()}/${hoy.getFullYear()} - ${hoy.getHours()}:${hoy.getMinutes()}:${hoy.getSeconds()}] </span>  : <span style="color:green; font-style:italic"> ${
          msj.mensaje
        }</span>`
    )
    .join("<br>");
  document.querySelector("p").innerHTML = mensajesHTML;
});

function addMessage(e) {
  const mensajeCapturado = {
    nameChat: document.getElementById("emailChat").value,
    mensaje: document.getElementById("text").value,
  };

  socket.emit("mensajeDesdeCliente", mensajeCapturado);
  return false;
}

function addProducts(e) {
  const productoCapturado = {
    nameProduct: document.getElementById("nameProduct").value,
    edad: document.getElementById("edad").value,
    genero: document.getElementById("genero").value,
    celular: document.getElementById("celular").value,
  };
  socket.emit("mensajeClienteProducto", productoCapturado);
  return false;
}

//==================================================//

socket.on("mensajeServidorProducto", (datos) => {
  const nombreHTML = datos.map((dato) => `${dato.nameProduct}`).join("<br>");
  document.querySelector("#nombre").innerHTML = nombreHTML;
  const edadHTML = datos.map((dato) => `${dato.edad}`).join("<br>");
  document.querySelector("#edad1").innerHTML = edadHTML;
  const generoHTML = datos.map((dato) => `${dato.genero}`).join("<br>");
  document.querySelector("#genero1").innerHTML = generoHTML;
  let celularHTML = datos.map((dato) => `${dato.celular}`).join("<br>");
  document.querySelector("#celular1").innerHTML = celularHTML;
});

// socket.on("mensajeServidorProducto", (datos1) => {
//   let edadHTML = datos1.map((dato1) => `${dato1.edad}`).join("<br>");
//   document.querySelector("#edad").innerHTML = edadHTML;
// });
