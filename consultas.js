const { Pool } = require('pg')
const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    password: '1313',
    database: 'cursos',
    port: 5432,
})


const nuevoCurso = async (curso) => {
    console.log
    const consulta = {
        text: 'INSERT INTO cursos (nombre, nivel, fecha, duracion) values ($1, $2, $3, $4) RETURNING *',
        values: [curso.nombre, curso.nivelTecnico, curso.fechaInicio, curso.duracion]
    }
    try {
        const result = await pool.query(consulta)
        return result.rows
    } catch (e) {
        return e
    }
}

const getCursos = async () => {
    try {
        const result = await pool.query(`SELECT id, nombre, nivel, TO_CHAR(fecha, 'dd-mm-yyyy') AS fecha, duracion FROM cursos`)
        return result.rows
    } catch (e) {
        return e
    }
}

const editarCurso = async (curso, id) => {
    const consulta = {
        text: 'UPDATE cursos SET nombre = $1, nivel = $2, fecha = $3, duracion = $4 WHERE id = $5 RETURNING *',
        values: [curso.nombre, curso.nivelTecnico, curso.fechaInicio, curso.duracion, id]
    }
    try {
        const res = await pool.query(consulta)
        return res.rows
    } catch (e) {
        return e
    }
}

async function eliminarCurso(id) {
    try {
        const result = await pool.query(`DELETE FROM cursos WHERE id ='${id}'`)
        return result.rowCount
    } catch (e) {
        return e
    }
}


module.exports = {
    nuevoCurso,
    getCursos,
    editarCurso,
    eliminarCurso
}