const { Pool } = require("pg");
const pool = new Pool({
    user: "chris",
    host: "localhost",
    database: "cursos",
    password: "chris1997",
    port: 5432,
});

async function nuevocurso(nombre, nivelTecnico, fechaInicio, duracion) {
try {
const result = await pool.query(
`INSERT INTO cursos (nombre, nivel, fecha, duracion) values ('${nombre}', '${nivelTecnico}', '${fechaInicio}', '${duracion}') RETURNING *`
);
return result.rows;
} catch (e) {
console.log(e);
return e;
}
}

async function getcursos() {
try {
const result = await pool.query(`SELECT * FROM cursos`);
return result.rows;
} catch (e) {
console.log(e);
return e;
}
}

async function editcurso(id, nombre, nivelTecnico, fechaInicio, duracion) {
try {
const res = await pool.query(
`UPDATE cursos SET nombre = '${nombre}', nivel = '${nivelTecnico}', fecha = '${fechaInicio}', duracion = '${duracion}' WHERE id = '${id}'
RETURNING *` 
);
return res.rows;
} catch (e) {
console.log(e);
return e;
}
}

async function deletecurso(id) {
    try {
    const result = await pool.query(`DELETE FROM cursos WHERE id =
    '${id}'`);
    return result.rowCount;
    } catch (e) {
    return e;
    }
    }    

module.exports = {nuevocurso, getcursos, editcurso, deletecurso}