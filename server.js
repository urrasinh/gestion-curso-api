const express = require('express')
const app = express()
app.listen(3000)

const { nuevoCanal,
    getCanales,
    editCanal,
    deleteCanal} = require('./consultas')


    

app.post('/canal', async (req, res) => {    
    const { nombre } = req.body    
    const respuesta = await nuevoCanal(nombre)    
    res.send(respuesta)
})

app.get('/canales', async (req, res) => {    
    const respuesta = await getCanales()    
    res.send(respuesta)
})

app.put('/canal/:id', async (req, res) => {    
    const { id } = req.params    
    const { nombre } = req.body    
    const respuesta = await editCanal(id, nombre)    
    res.send(respuesta)
})

app.delete("/canal/:id", async (req, res) => {   
    const { id } = req.params   
    const respuesta = await deleteCanal(id)    
    if (respuesta > 0){
        res.send(`El canal de id ${id} fue eliminado con éxito`)
    }else{
        res.send("No existe un canal registrado con ese id")
    }    
    })