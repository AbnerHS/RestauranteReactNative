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

app.post('/cadastro', async(req, res) => {
    let insert = await cliente.create({ 
        nome: req.body.nome,
        telefone: req.body.telefone,
        senha: req.body.senha
    });
    res.send(JSON.stringify(value='ok'));
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
})

// app.get('/', (req, res) => {
//     res.send("Servidor funcionando!");
// })

let port = process.env.PORT || 3000;
app.listen(port, (req, res) => {
    console.log("Servidor Rodando");
})