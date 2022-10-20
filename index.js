import express from 'express'
import { engine } from 'express-handlebars';
import contenedor from './class.js';

const app = express();
const PORT = process.env.PORT || 8080;
const { Router } = express;
const apiRouter = Router();

app.use(express.json());
app.use('/API', apiRouter);
app.use(express.urlencoded({ extended: true }));
app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.set('main', './views');
app.listen(8080);

app.get('/', async (req, res)=>{
    const datos = await contenedor.getAll();
    res.render('productos_tabla', {datos});
});
app.get('/registrar', async(req, res)=>{
    res.render('productos_form');
});

apiRouter.get('/productos', async (req, res) => {
    res.send(await contenedor.getAll());
});
apiRouter.post('/productos', async (req, res) => {
    const { title, price, thumbnail } = req.body;
    await contenedor.save({ title, price, thumbnail });
    res.send({ saved: true });
});