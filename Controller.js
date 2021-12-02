const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const models = require('./models');

const app = express();
app.use(cors());
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
let cliente = models.Cliente;
let produto = models.Produto;
let pedido = models.Pedido;
let pedidoProduto = models.PedidoProduto;


app.post('/cadastro', async(req, res) => {
    let insert = await cliente.create({ 
        nome: req.body.nome,
        telefone: req.body.telefone,
        senha: req.body.senha
    });
    res.send(JSON.stringify(insert.id));
});

app.post('/login', async(req, res) => {
    let query = await cliente.findOne({
                    where:{telefone:req.body.telefone,senha:req.body.senha}
                });
    if(query == null){
        res.send(JSON.stringify(value='erro'));
    } else {
        res.send(query);
    }    
});

app.get('/produtos', async(req, res) => {
    let query = await produto.findAll();
    res.send(query);
});

app.post('/enviarPedido', async(req, res) => {
    let queryPedido = await pedido.create({
        clienteId: req.body.id,
        mesa: req.body.mesa,
        status: 'Pendente',
    });
    let idPedido = queryPedido.id;
    req.body.items.forEach(async (item) => {
        let produto = await pedidoProduto.create({
            pedidoId: idPedido,
            produtoId: item
        });
    });
    res.send(JSON.stringify("ok"));
});


app.post('/carrinho', async(req, res) => {
    let carrinho = []
    if(req.body.items){
        carrinho = await Promise.all(req.body.items.map(async(item, index) => {
            let query = await produto.findOne({
                where: {
                    id: item
                }
            });
            return {item: query, index: index};
        }));
    }
    console.log(carrinho);
    res.send(carrinho);
});

app.post('/pedidos', async(req, res) => {
    let query = await pedido.findAll({
        where: {
            clienteId: req.body.id
        }
    });
    res.send(query);
});

app.post('/produtosPedido', async(req, res) => {
    let query = await produto.findAll({
        include: [{
            model: pedidoProduto,
            required: true,
            where: {
                pedidoId: req.body.id
            }
        }]
    });
    res.send(query);
})

// app.get('/', (req, res) => {
//     res.send("Servidor funcionando!");
// })

let port = process.env.PORT || 3000;
app.listen(port, (req, res) => {
    console.log("Servidor Rodando");
})