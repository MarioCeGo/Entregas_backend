const express = require('express');
const { engine } = require('express-handlebars');
const container = require('./models/container.js');
const messages = require('./models/message.js')
const { Server: IOServer } = require('socket.io');
const { Server: HttpServer } = require('http');
const {faker} = require('@faker-js/faker');

const app = express();
const PORT = process.env.PORT || 8080;
const { Router } = express;
const apiRouter = Router();

const httpServer = new HttpServer(app);
const io = new IOServer(httpServer);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('./public'));
app.use('/API', apiRouter);
app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.set('main', './views');
httpServer.listen(PORT, ()=>{
    console.log(`Running in ${PORT}`)
});

app.get('/api/products/test', async (req, res) => {
    const prods = [];
    for (let i = 0; i < 5; i++) {
        let prod = {
            name: faker.commerce.productName(),
            description: faker.commerce.productDescription(),
            code: faker.random.alphaNumeric(8),
            thumbnail: faker.image.imageUrl(),
            price: faker.commerce.price(),
            stock: faker.random.numeric(),
            date: faker.date.recent(),
        };
        prods.push(prod);
    }
    res.send(prods);
});

app.get('/', async (req, res) => {
    const datos = await container.getAll();
    res.render('productos_tabla', { datos });
});

io.on('connection', (socket) => {
    getAllProducts(socket);
    getAllMessages(socket);
    socket.on("new product", product => {
        setProduct(product);
    });
    socket.on("new message", msg => {
        setMessage(msg);
    })
    console.log('Usuario conectado');
})

const getAllProducts = async (socket) => {
    const listProducts = await container.getAll();
    socket.emit("products", listProducts);
}
const getAllMessages = async (socket) => {
    const listMessages = await messages.getAll();
    socket.emit("messages", listMessages);
}

const setProduct = async (prod) => {
    await container.save(prod);
    io.sockets.emit("products", await container.getAll());
}
const setMessage = async (msg) => {
    await messages.save(msg);
    io.sockets.emit("messages", await messages.getAll())
}
