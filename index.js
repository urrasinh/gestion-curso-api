const express = require('express')
const app = express()
const path = require('path')
const { nuevoCurso,
    getCursos,
    editarCurso,
    eliminarCurso
} = require('./consultas')

app.listen(3000, () => {
    console.log('Servidor activo en puerto 3000')
})

app.use(express.json())

app.get("/", (req, res) => {
    const ruta = path.join(__dirname, 'index.html')
    res.sendFile(ruta)
})


app.post('/curso', async (req, res) => {
    const datosCurso = req.body
    const respuesta = await nuevoCurso(datosCurso)
    res.send(respuesta)
})

app.get('/cursos', async (req, res) => {
    const respuesta = await getCursos()
    res.send(respuesta)
})

app.put('/curso/:id', async (req, res) => {
    const datos = req.body
    const { id } = req.params
    const respuesta = await editarCurso(datos, id)
    res.send(respuesta)
})

app.delete("/curso/:id", async (req, res) => {
    const { id } = req.params
    console.log(id)
    const respuesta = await eliminarCurso(id)
    if (respuesta > 0) {
        res.send(`El curso de id ${id} fue eliminado con éxito`)
    } else {
        res.send("No existe un canal registrado con ese id")
    }
})