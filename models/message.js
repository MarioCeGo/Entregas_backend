const fs = require('fs')
const normalizr = require('normalizr');

class Message{
    constructor(){
        this.name = "mensajes.txt";
    }

    async save(author, msg) {
        try {
            try {
                const data = await fs.promises.readFile(this.name, 'utf-8');
                data.push(new Message(author, msg));
                await fs.promises.writeFile(this.name, JSON.stringify(data));
            } catch (error) {
                await fs.promises.writeFile(this.name, JSON.stringify(new Message(author, msg)));
            }
        } catch (error) {
            console.log("No se pudo guardar correctamente")
        }
    }

    async getAll() {
        try {

            const data = await fs.promises.readFile(this.name, 'utf-8');
            const normalize = normalizr.normalize;
            const author = new normalizr.schema.Entity("author");
            const msg = new normalizr.schema.Entity("msg", {
                author: author
            });
            const holding = new normalizr.schema.Entity("holding", {
                msg: msg
            });
            const msgNormalize = normalize(JSON.parse(data), holding);
            console.log(msgNormalize)
            return await (data.length > 0 ? msgNormalize : []);
        } catch (error) {
            console.log(error);
        }
    }
}

const messages = new Message();
messages.getAll();



module.exports = messages;