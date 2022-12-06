const fs = require('fs')
const normalizr = require('normalizr');
const Author = require('./author.js');
const Msg = require('./msg.js');
const util = require('util');

class Message{
    constructor(){
        this.name = "mensajes.txt";
    }

    async save(msg) {
        try {
            try {
                const data = await fs.promises.readFile(this.name, 'utf-8');
                console.log(data)
                const author = new Author(msg.email, msg.name, msg.lastName, msg.age, msg.alias, msg.avatar);
                const message = new Msg(author, msg.message);
                console.log()
                data.push(message);
                console.log("data")
                await fs.promises.writeFile(this.name, JSON.stringify(data));
            } catch (error) {
                console.log(error)
                const author = new Author(msg.email, msg.name, msg.lastName, msg.age, msg.alias, msg.avatar);
                await fs.promises.writeFile(this.name, JSON.stringify([new Msg(author, msg.message)]));
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
            console.log(error);
        }
    }
    async getAllNormailze(){
        try {
            const data = await fs.promises.readFile(this.name, 'utf-8');
            const normalize = normalizr.normalize;
            const author = new normalizr.schema.Entity("author");
            const text = new normalizr.schema.Entity("text");
            const msg = new normalizr.schema.Entity("msg", {
                author: author,
                text: text
            });
            const holding = new normalizr.schema.Entity("holding", {
                msg: msg
            });

            const msgNormalize = normalize(JSON.parse(data), holding);
            console.log(data.length)
            console.log(JSON.stringify(msgNormalize).length)
            console.log(util.inspect(msgNormalize, false, 12, true));
            return await (data.length > 0 ? msgNormalize : []);
        } catch (error) {
            console.log(error)
        }
    }
}

const messages = new Message();
messages.getAllNormailze();



module.exports = messages;