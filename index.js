//Desafio Servidor con express - Mario Gonzalez
const fs = require('fs')
const express = require('express');
const app = express();
const PORT = process.env.PORT || 8080;



class Contenedor {
    constructor(name) {
        this.name = `./${name}.txt`
    }
    async save(prod) {
        try {
            try {
                const data = await this.getAll();
                data.length === 0 ? prod.id = 1 : prod.id = data[data.length - 1].id + 1;
                data.push(prod);
                await fs.promises.writeFile(this.name, JSON.stringify(data));
            } catch (error) {
                prod.id = 1
                await fs.promises.writeFile(this.name, JSON.stringify([prod]));
            }
        } catch (error) {
            console.log("No se pudo guardar correctamente")
        }
    }

    async getById(id) {
        try {
            const data = await this.getAll();
            console.log(data.find(elem => elem.id === id))
        } catch (error) {
            console.log("No se pudo encontrar el elemento")
        }
    }
    async getAll() {
        try {
            const data = await fs.promises.readFile(this.name, 'utf-8');
            return await (data.length > 0 ? JSON.parse(data) : []);
        } catch (error) {

        }
    }
    async deleteById(id) {
        try {
            const data = await this.getAll();
            data.splice(data.indexOf(data.find(elem => elem.id === id)), 1)
            await fs.promises.writeFile(this.name, JSON.stringify(data));
            console.log("Elemento borrado correctamente")
        } catch (error) {
            console.log("No se pudo borrar correctamente");
        }

    }
    async deleteAll(){
        await fs.promises.writeFile(this.name, JSON.stringify([]));
    }
}

const contenedor = new Contenedor('productos');

app.get('/productos', async(req, res) => {
    res.send(await contenedor.getAll());
})
app.get('/productoRandom', async (req, res) => {
    const productos = await contenedor.getAll()
    const prodRandom = Math.floor(Math.random() * (productos.length - 0 + 1) + 0);
    res.send(productos[prodRandom]);
})

const server = app.listen(PORT, ()=> console.log('Server is running'));
server.on('error', err => console.log('error'))


