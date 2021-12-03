const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const models = require('./models');
const app = express();
const http = require("http").Server(app);
const io = require('socket.io')(http);
app.use(cors());
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
let cliente = models.Cliente;
let produto = models.Produto;
let pedido = models.Pedido;
let pedidoProduto = models.PedidoProduto;
let admin = models.Admin;

io.on("connection", socket => {
    socket.on('pedido', () => {
        io.emit('novoPedido');
    })
    socket.on('status', () => {
        io.emit('novoStatus');
    })
    socket.on('disconnect', () => {
        console.log("desconectado");
    });
})

let port = process.env.PORT || 3000;
http.listen(port, function(){
    console.log("Servidor Rodando");
})

app.post('/mudarEstado', async(req, res) => {
    let query = await pedido.update({
        status: req.body.status,
    },
    {
        where: {id: req.body.id}
    });
    res.send(JSON.stringify(value="ok"));
});

app.post('/pedidoCozinha', async(req, res) => {
    let query = await pedido.findOne({
        include: [{
            model: cliente,
            required: true,
        }],
        where:{
            id: req.body.id
        }
    });
    res.send(query);
});

app.post('/pedidosCozinha', async(req, res) => {
    const { Op } = require("sequelize");
    let query = await pedido.findAll({
        where:{
            status: {
                [Op.not]: 2
            }
        },
        order: [
            ['createdAt','desc']
        ]
    });
    res.send(query);
});

app.post('/loginCozinha', async(req, res) => {
    let query = await admin.findOne({
        where:{
            login:req.body.login,
            senha:req.body.senha
        }
    });
    if(query == null){
        res.send(JSON.stringify(value='erro'));
    } else {
        res.send(query);
    }  
});

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
        where:{
            telefone:req.body.telefone,
            senha:req.body.senha
        }
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
        status: 0,
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
    res.send(carrinho);
});

app.post('/pedidos', async(req, res) => {
    let query = await pedido.findAll({
        where: {
            clienteId: req.body.id
        },
        order: [
            ['createdAt','desc'],
            ['status','desc']
        ]
    });
    res.send(query);
});

app.post('/produtosPedido', async(req, res) => {
    let query = await pedidoProduto.findAll({
        where: {
            pedidoId: req.body.id
        }
    });
    
    produtos = await Promise.all(query.map(async(item, index) => {
        let query = await produto.findAll({
            include: [{
                model: pedidoProduto,
                required: true,
                where: {
                    id: item.id
                }
            }],
            // attributes: ['nome','valor','categoria']
        });
        return {item: query, index: index};
    }));
    res.send(produtos);
})

// app.get('/', (req, res) => {
//     res.send("Servidor funcionando!");
// })

// let port = process.env.PORT || 3000;
// app.listen(port, (req, res) => {
//     console.log("Servidor Rodando");
// })