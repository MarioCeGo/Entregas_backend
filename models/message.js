const fs = require('fs')

class Message {

    constructor(name) {
        this.name = `./${name}.txt`
    }

    async save(msg) {
        try {
            try {
                const data = await this.getAll();
                data.length === 0 ? msg.id = 1 : msg.id = data[data.length - 1].id + 1;
                data.push(msg);
                await fs.promises.writeFile(this.name, JSON.stringify(data));
            } catch (error) {
                msg.id = 1
                await fs.promises.writeFile(this.name, JSON.stringify([msg]));
            }
        } catch (error) {
            console.log("No se pudo guardar correctamente")
        }
    }

    async getAll() {
        try {
            const data = await fs.promises.readFile(this.name, 'utf-8');
            return await (data.length > 0 ? JSON.parse(data) : []);
        } catch (error) {
        }
    }
}
const messages = new Message('mensajes');

module.exports = messages;