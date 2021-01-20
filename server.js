const express = require("express");
const app = express();
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.listen(3003);
const { nuevocurso, getcursos, editcurso, deletecurso} = require("./consultas");
app.get("/", (req, res)=>{
    res.sendFile(__dirname + "/index.html")
})
app.post("/curso", async (req, res) => {
const { nombre, nivelTecnico, fechaInicio, duracion } = req.body;
console.log(nombre, nivelTecnico, fechaInicio, duracion)
const respuesta = await nuevocurso(nombre, nivelTecnico, fechaInicio, duracion);
res.send(respuesta);
});
app.get("/cursos", async (req, res) => {
const respuesta = await getcursos();
res.send(respuesta);
});
app.put("/curso/:id", async (req, res) => {
const { id } = req.params;
const { nombre, nivelTecnico, fechaInicio, duracion } = req.body;
console.log(req)
console.log(id)
console.log(id, nombre, nivelTecnico, fechaInicio, duracion)
const respuesta = await editcurso(id, nombre, nivelTecnico, fechaInicio, duracion);
res.send(respuesta);
});
app.delete("/curso/:id", async (req, res) => {
const { id } = req.params;
console.log(id)
const respuesta = await deletecurso(id);
respuesta > 0
? res.send(`El actor de id ${id} fue elimado con éxito`)
: res.send("No existe un actor registrado con ese id");
});