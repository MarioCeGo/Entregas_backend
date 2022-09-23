//Desafio manejos de archivos - Mario Gonzalez
const fs = require('fs')
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
            return (data.length > 0 ? JSON.parse(data) : []);
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
}
const contenedor = new Contenedor('productos');

// contenedor.save({
//     title: 'Calculadora',
//     price: 234.56,
//     thumbnail: 'https://cdn3.iconfinder.com/data/icons/education-209/64/calculator-math-tool-school-256.png',
//   }
// )

// contenedor.save({
//     title: 'Globo Terráqueo',
//     price: 345.67,
//     thumbnail: 'https://cdn3.iconfinder.com/data/icons/education-209/64/globe-earth-geograhy-planet-school-256.png',
//   }
// )

// contenedor.save({
//     title: 'Escuadra',
//     price: 123.45,
//     thumbnail: 'https://cdn3.iconfinder.com/data/icons/education-209/64/ruler-triangle-stationary-school-256.png',
// }
// )

// contenedor.deleteById(4)

// contenedor.getById(1)