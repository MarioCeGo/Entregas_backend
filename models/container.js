const fs = require('fs')

class Container {

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
            if (data.includes(data.find(elem => elem.id === id))) {
                return data.find(elem => elem.id === id);
            } else {
                return { error: 'producto no encontrado' }
            }

        } catch (error) {
        }
    }

    async editById(id, { title, price, thumbnail }) {
        const data = await this.getAll();
        const prod = data.find(elem => elem.id === Number(id));
        prod.title = title;
        prod.price = price;
        prod.thumbnail = thumbnail;
        await fs.promises.writeFile(this.name, JSON.stringify(data));
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
            return ("Elemento borrado correctamente")
        } catch (error) {
            return ("No se pudo borrar correctamente");
        }
    }

    async deleteAll() {
        await fs.promises.writeFile(this.name, JSON.stringify([]));
    }
}

const container = new Container('productos');

module.exports = container;