const express = require("express");
//cargamos el modulo handlebars
const app = express();

//-------------------------------------//

//Uso de websockets
const { Server: HttpServer } = require("http");
const { Server: IOServer } = require("socket.io");

const httpServer = new HttpServer(app);
const io = new IOServer(httpServer);

//------------------------------------//

const exphbs = require("express-handlebars");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
//configuramos handlebars

app.engine(
  "hbs", //Nombre referencia a la plantilla(se usa luego en set)
  exphbs.engine({
    //funcion de configuracion  handlebars
    extname: "hbs", //extension a utilizar
    defaultLayout: "index.hbs", //plantilla principal
    layoutsDir: __dirname + "/public/layouts", //ruta de plantilla principal
    partialsDir: __dirname + "/public/partials/", //ruta a las plantillas parciales
  })
);

//establecemos el motor de plantilla que se utiliZA
app.set("view ingine", "hbs");
//establecemos directorio donde se encuentran los archivos de la plantilla
app.set("views", "public");

//handlebars

app.get("/", (req, res) => {
  res.render("datos.hbs");
});
//-----------------------------//

//espacio publico del servidor
app.use(express.static("public"));

//================================================//

const listaProductos = [];

const chat = [];

io.on("connection", (socket) => {
  console.log("Nuevo Cliente Conectado!");

  //incluyendo chat-----------------------//

  socket.emit("mensajeDesdeServidor", chat);

  socket.on("mensajeDesdeCliente", (data) => {
    chat.push(data);
    io.sockets.emit("mensajeDesdeServidor", chat);
    console.log(chat);
  });

  socket.on("mensajeClienteProducto", (data) => {
    listaProductos.push(data);
    io.sockets.emit("mensajeServidorProducto", listaProductos);
    console.log(listaProductos);
  });

  //====================================================//
});

//----------------------------------------//

const PORT = 3000;

const connectedServer = httpServer.listen(PORT, () => {
  console.log(
    `Servidor Http con Websockets escuchando en el puerto ${
      connectedServer.address().port
    }`
  );
});

connectedServer.on("error", (error) => {
  console.log(`Error en el Servidor ${error}`);
});
