// imports
const express = require('express')
const exphbs = require('express-handlebars')
const mysql = require('mysql')
const session = require('express-session')
const bodyParser = require('body-parser')
var path = require('path')
const port = 3000;

//  express
const app = express()

// configurar o handlebars
app.engine ('handlebars', require('ejs').renderFile);
app.engine('handlebars', exphbs.engine())
app.set('view engine', 'handlebars')

app.use('/publico', express.static(__dirname + '/publico'))
app.use(bodyParser.urlencoded({extended: true}))

//session

app.use(session({secret:'logado100'}));


// rotas
app.get('/', (req, res) => {
    res.render('login', { layout: false })
})

// app.get('/home', (req, res) => {
//     res.render('home', { layout: false })
// })

//rota do buscar
app.get('/busca', (req, res) => {
    res.render('busca', { layout: false })
})

app.use(
    express.urlencoded({
        extended: true
    })
)

// inserir dados na tabela clientes
app.post('/prod/insertprod', (req, res) => {
    const nome_cliente = req.body.nome_cliente
    const cpf = req.body.cpf
    const email = req.body.email
    const telefone = req.body.telefone
    const endereco_cliente = req.body.endereco_cliente
    const id_do_emprestimo = req.body.id_do_emprestimo
    const id_do_cartao = req.body.id_do_cartao
    const id_da_agencia = req.body.id_da_agencia

    const sql = `INSERT INTO clientes (nome_cliente,cpf,email,telefone,endereco_cliente,id_do_emprestimo,id_do_cartao,id_da_agencia) VALUES ('${nome_cliente}','${cpf}','${email}','${telefone}','${endereco_cliente}','${id_do_emprestimo}','${id_do_cartao}','${id_da_agencia}')`

    conn.query(sql, function (err) {
        if (err) {
            console.log(err)
        }
        res.redirect('/')
        console.log("Cadastro com sucesso")
    })
})

// consulta geral da tabela clientes
app.get('/prod', (req, res) => {

    const sql = 'SELECT * FROM clientes'
    conn.query(sql, function (err, data) {
        if (err) {
            console.log(err)
            return
        }
        const listar = data
        console.log(listar)
        res.render('prod', { layout: false, listar })
    })
})

// consulta um registro pelo id(produto.handlebars) da tabela clientes
app.get('/prod/:id_do_cliente', (req, res) => {
    const id_do_cliente = req.params.id_do_cliente

    const sql = `SELECT * FROM clientes WHERE id_do_cliente = ${id_do_cliente}`

    conn.query(sql, function (err, data) {
        if (err) {
            console.log(err)
            return
        }
        const listarProd = data[0]
        res.render('clientes', { layout: false, listarProd })
    })
})

// pegando para editar registro da tabela clientes
app.get('/prod/edit/:id_do_cliente', (req, res) => {
    const id_do_cliente = req.params.id_do_cliente
    const sql = `SELECT * FROM clientes where id_do_cliente = ${id_do_cliente}`

    conn.query(sql, function (err, data) {
        if (err) {
            console.log(err)
            return
        }
        const prod = data[0]
        res.render('edit', { layout: false, prod })
    })
})

// editando o registro com post na tabela clientes
app.post('/prod/updateprod', (req, res) => {
    const id_do_cliente = req.body.id_do_cliente
    const nome_cliente = req.body.nome_cliente
    const cpf = req.body.cpf
    const email = req.body.email
    const telefone = req.body.telefone
    const endereco_cliente = req.body.endereco_cliente
    const id_do_emprestimo = req.body.id_do_emprestimo
    const id_do_cartao = req.body.id_do_cartao
    const id_da_agencia = req.body.id_da_agencia

    const sql = `UPDATE clientes SET nome_cliente = '${nome_cliente}', cpf = '${cpf}', email = '${email}', telefone = '${telefone}', endereco_cliente = '${endereco_cliente}', id_do_emprestimo = '${id_do_emprestimo}', id_do_cartao = '${id_do_cartao}', id_da_agencia = '${id_da_agencia}' WHERE id_do_cliente = ${id_do_cliente}`

    conn.query(sql, function (err) {
        if (err) {
            console.log(err)
            return
        }
        res.redirect('/prod')
    })
})

// deletar registro da tabela clientes
app.get('/prod/remove/:id_do_cliente', (req, res) => {
    const id_do_cliente = req.params.id_do_cliente

    const sql = `DELETE FROM clientes WHERE id_do_cliente = '${id_do_cliente}'`

    conn.query(sql, function (err) {
        if (err) {
            console.log(err)
            return
        }
        res.redirect('/prod')
    })
})

// busca de resgistro da tabela clientes
//rota de busca (busc) que enviar para view cliente cliente.handlebars
app.post('/busc/', (req, res) => {
    const id_do_cliente = req.body.id_do_cliente

    const sql = `SELECT * FROM clientes WHERE id_do_cliente = ${id_do_cliente}`

    conn.query(sql, function (err, data) {
        if (err) {
            console.log(err)
            return
        }
        const listarProd = data[0]
        res.render('clientes', { layout: false, listarProd })
    })
})

// inserir dados na tabela emprestimo
app.post('/emp/insertemp', (req, res) => {
    const nome = req.body.nome_cliente
    const emprestimo = req.body.emprestimo
    const parcelas = req.body.parcelas
    const juros = req.body.juros
    const data = req.body.data
    const sql = `INSERT INTO emprestimo (nome,valor_emprestimo,parcelas,juros,data) VALUES ('${nome}','${emprestimo}','${parcelas}','${juros}','${data}')`

    conn.query(sql, function (err) {
        if (err) {
            console.log(err)
        }
        res.redirect('/')
        console.log("Cadastro com sucesso")
    })
})

// consulta geral da tabela emprestimo
app.get('/emp', (req, res) => {

    const sql = 'SELECT * FROM emprestimo'
    conn.query(sql, function (err, data) {
        if (err) {
            console.log(err)
            return
        }
        const listar = data
        console.log(listar)
        res.render('emp', { layout: false, listar })
    })
})

// consulta um registro pelo id(produto.handlebars) da tabela emprestimo
app.get('/emp/:id_do_emprestimo', (req, res) => {
    const id_do_emprestimo = req.params.id_do_emprestimo

    const sql = `SELECT * FROM emprestimo WHERE id_do_emprestimo = ${id_do_emprestimo}`

    conn.query(sql, function (err, data) {
        if (err) {
            console.log(err)
            return
        }
        const listarEmp = data[0]
        res.render('emprestimo', { layout: false, listarEmp })
    })
})

// pegando para editar registro da tabela emprestimo
app.get('/emp/editE/:id_do_emprestimo', (req, res) => {
    const id_do_emprestimo = req.params.id_do_emprestimo
    const sql = `SELECT * FROM emprestimo where id_do_emprestimo = ${id_do_emprestimo}`

    conn.query(sql, function (err, data) {
        if (err) {
            console.log(err)
            return
        }
        const emp = data[0]
        res.render('editE', { layout: false, emp })
    })
})

// editando o registro com post na tabela emprestimo
app.post('/emp/updateemp', (req, res) => {
    const id_do_emprestimo = req.body.id_do_emprestimo
    const nome = req.body.nome
    const valor = req.body.emprestimo
    const parcelas = req.body.parcelas
    const juros = req.body.juros
    const data = req.body.data

    const sql = `UPDATE emprestimo SET nome = '${nome}', valor_emprestimo = '${valor}', parcelas = '${parcelas}', juros = '${juros}', data = '${data}' WHERE id_do_emprestimo = ${id_do_emprestimo}`

    conn.query(sql, function (err) {
        if (err) {
            console.log(err)
            return
        }
        res.redirect('/emp')
    })
})

// deletar registro da tabela emprestimo
app.get('/emp/remove/:id_do_emprestimo', (req, res) => {
    const id_do_emprestimo = req.params.id_do_emprestimo

    const sql = `DELETE FROM emprestimo WHERE id_do_emprestimo = '${id_do_emprestimo}'`

    conn.query(sql, function (err) {
        if (err) {
            console.log(err)
            return
        }
        res.redirect('/emp')
    })
})

// busca de resgistro da tabela emprestimo
//rota de busca (busque) que enviar para view emprestimo.handlebars
app.post('/busque/', (req, res) => {
    const id_do_emprestimo = req.body.emprestimo

    const sql = `SELECT * FROM emprestimo WHERE id_do_emprestimo = ${id_do_emprestimo}`

    conn.query(sql, function (err, data) {
        if (err) {
            console.log(err)
            return
        }
        const listarEmp = data[0]
        res.render('emprestimo', { layout: false, listarEmp })
    })
})


// inserir dados na tabela agencia
app.post('/age/insertage', (req, res) => {
    const endereco = req.body.endereco
    const email = req.body.email
    const telefone = req.body.telefone

    const sql = `INSERT INTO agencia (endereco,email,telefone) VALUES ('${endereco}','${email}','${telefone}')`

    conn.query(sql, function (err) {
        if (err) {
            console.log(err)
        }
        res.redirect('/')
        console.log("Cadastro com sucesso")
    })
})

// consulta geral da tabela agencia
app.get('/age', (req, res) => {

    const sql = 'SELECT * FROM agencia'
    conn.query(sql, function (err, data) {
        if (err) {
            console.log(err)
            return
        }
        const listar = data
        console.log(listar)
        res.render('age', { layout: false, listar })
    })
})

// consulta um registro pelo id(produto.handlebars) na tabela agencia
app.get('/age/:id_da_agencia', (req, res) => {
    const id_da_agencia = req.params.id_da_agencia

    const sql = `SELECT * FROM agencia WHERE id_da_agencia = ${id_da_agencia}`

    conn.query(sql, function (err, data) {
        if (err) {
            console.log(err)
            return
        }
        const listarAge = data[0]
        res.render('agencia', { layout: false, listarAge })
    })
})

// pegando para editar registro da tabela agencia
app.get('/age/editA/:id_da_agencia', (req, res) => {
    const id_da_agencia = req.params.id_da_agencia
    const sql = `SELECT * FROM agencia where id_da_agencia = ${id_da_agencia}`

    conn.query(sql, function (err, data) {
        if (err) {
            console.log(err)
            return
        }
        const age = data[0]
        res.render('editA', { layout: false, age })
    })
})

// editando o registro com post na tabela agencia
app.post('/age/updateage', (req, res) => {
    const id_da_agencia = req.body.id_da_agencia
    const endereco = req.body.endereco
    const email = req.body.email
    const telefone = req.body.telefone

    const sql = `UPDATE agencia SET endereco = '${endereco}', email = '${email}', telefone = '${telefone}' WHERE id_da_agencia = ${id_da_agencia}`

    conn.query(sql, function (err) {
        if (err) {
            console.log(err)
            return
        }
        res.redirect('/age')
    })
})

// deletar registro da tabela agencia
app.get('/age/remove/:id_da_agencia', (req, res) => {
    const id_da_agencia = req.params.id_da_agencia

    const sql = `DELETE FROM agencia WHERE id_da_agencia = '${id_da_agencia}'`

    conn.query(sql, function (err) {
        if (err) {
            console.log(err)
            return
        }
        res.redirect('/age')
    })
})

// busca de resgistro na tabela agencia
//rota de busca (busque) que enviar para view emprestimo.handlebars
app.post('/buscaA/', (req, res) => {
    const id_da_agencia = req.body.id_da_agencia

    const sql = `SELECT * FROM agencia WHERE id_da_agencia = ${id_da_agencia}`

    conn.query(sql, function (err, data) {
        if (err) {
            console.log(err)
            return
        }
        const listarAge = data[0]
        res.render('agencia', { layout: false, listarAge })
    })
})


// inserir dados na tabela funcionarios
app.post('/fun/insertfun', (req, res) => {
    const nome = req.body.nome
    const cpf = req.body.cpf
    const email = req.body.email
    const telefone = req.body.telefone
    const cargo = req.body.cargo

    const sql = `INSERT INTO funcionarios (nome,cpf,email,telefone,cargo) VALUES ('${nome}','${cpf}','${email}','${telefone}','${cargo}')`

    conn.query(sql, function (err) {
        if (err) {
            console.log(err)
        }
        res.redirect('/')
        console.log("Cadastro com sucesso")
    })
})

// consulta geral da tabela funcionarios
app.get('/fun', (req, res) => {

    const sql = 'SELECT * FROM funcionarios'
    conn.query(sql, function (err, data) {
        if (err) {
            console.log(err)
            return
        }
        const listar = data
        console.log(listar)
        res.render('fun', { layout: false, listar })
    })
})

// consulta um registro pelo id(produto.handlebars) na tabela funcionarios
app.get('/fun/:id_funcionario', (req, res) => {
    const id_funcionario = req.params.id_funcionario

    const sql = `SELECT * FROM funcionarios WHERE id_funcionario = ${id_funcionario}`

    conn.query(sql, function (err, data) {
        if (err) {
            console.log(err)
            return
        }
        const listarFun = data[0]
        res.render('funcionarios', { layout: false, listarFun })
    })
})

// pegando para editar registro da tabela funcionarios
app.get('/fun/editF/:id_funcionario', (req, res) => {
    const id_funcionario = req.params.id_funcionario
    const sql = `SELECT * FROM funcionarios where id_funcionario = ${id_funcionario}`

    conn.query(sql, function (err, data) {
        if (err) {
            console.log(err)
            return
        }
        const fun = data[0]
        res.render('editF', { layout: false, fun })
    })
})

// editando o registro com post na tabela funcionarios
app.post('/fun/updatefun', (req, res) => {
    const id_funcionario = req.body.id_funcionario
    const nome = req.body.nome
    const cpf = req.body.cpf
    const email = req.body.email
    const telefone = req.body.telefone
    const cargo = req.body.cargo

    const sql = `UPDATE funcionarios SET nome = '${nome}', cpf = '${cpf}', email = '${email}', telefone = '${telefone}', cargo = '${cargo}' WHERE id_funcionario = ${id_funcionario}`

    conn.query(sql, function (err) {
        if (err) {
            console.log(err)
            return
        }
        res.redirect('/fun')
    })
})

// deletar registro da tabela funcionarios
app.get('/fun/remove/:id_funcionario', (req, res) => {
    const id_funcionario = req.params.id_funcionario

    const sql = `DELETE FROM funcionarios WHERE id_funcionario = '${id_funcionario}'`

    conn.query(sql, function (err) {
        if (err) {
            console.log(err)
            return
        }
        res.redirect('/fun')
    })
})

// busca de resgistro na tabela funcionarios
//rota de busca (busque) que enviar para view funcionarios.handlebars
app.post('/buscaF/', (req, res) => {
    const id_funcionario = req.body.id_funcionario

    const sql = `SELECT * FROM funcionarios WHERE id_funcionario = ${id_funcionario}`

    conn.query(sql, function (err, data) {
        if (err) {
            console.log(err)
            return
        }
        const listarFun = data[0]
        res.render('funcionarios', { layout: false, listarFun })
    })
})


// inserir dados na tabela cartao
app.post('/cartao/insertcartao', (req, res) => {
    const coddeseg = req.body.coddeseg
    const dataexp = req.body.dataexp
    const tipodecartao = req.body.tipodecartao
    const limitecartao = req.body.limitecartao
    const saldocartao = req.body.saldocartao
    const sql = `INSERT INTO cartao (coddeseg, dataexp, tipodecartao, limitecartao, saldocartao) VALUES ( '${coddeseg}','${dataexp}','${tipodecartao}','${limitecartao}','${saldocartao}')`
    conn.query(sql, function (err) {
        if (err) {
            console.log(err)
        }
        res.redirect('/')
        console.log("Cadastro com sucesso")
    })
})

// consulta geral da tabela cartao
app.get('/cart', (req, res) => {
    const sql = 'SELECT * FROM cartao'

    conn.query(sql, function (err, data) {
        if (err) {
            console.log(err)
            return
        }
        const listar = data
        console.log(listar)
        res.render('cart', { layout: false, listar })
    })
})


// consulta um registro pelo iddocartao (cartao.handlebars) na tabela cartao
app.get('/cartao/:iddocartao', (req, res) => {
    const iddocartao = req.params.iddocartao

    const sql = `SELECT * FROM cartao WHERE iddocartao = ${iddocartao}`

    conn.query(sql, function (err, data) {
        if (err) {
            console.log(err)
            return
        }
        const listarCartao = data[0]
        res.render('cartao', { layout: false, listarCartao })
    })
})

// pegando para editar registro da tabela cartao
app.get('/cartao/editCart/:iddocartao', (req, res) => {
    const iddocartao = req.params.iddocartao

    const sql = `SELECT * FROM cartao WHERE iddocartao = ${iddocartao}`

    conn.query(sql, function (err, data) {
        if (err) {
            console.log(err)
            return
        }
        const cartao = data[0]
        res.render('editCart', { layout: false, cartao })
    })
})

// editando o registro com post na tabela cartao
app.post('/alterar/updateclient', (req, res) => {
    const iddocartao = req.body.iddocartao
    const coddeseg = req.body.coddeseg
    const dataexp = req.body.dataexp
    const tipodecartao = req.body.tipodecartao
    const limitecartao = req.body.limitecartao
    const saldocartao = req.body.saldocartao
    const sql = `UPDATE cartao SET coddeseg = '${coddeseg}', dataexp = '${dataexp}', tipodecartao = '${tipodecartao}', limitecartao= '${limitecartao}', saldocartao = '${saldocartao}' WHERE iddocartao = '${iddocartao}' `

    conn.query(sql, function (err) {
        if (err) {
            console.log(err)
        }
        res.redirect(`/cartao/${iddocartao}`)
        console.log("Alterado com sucesso")
    })
})

// deletar registro da tabela cartao
app.get('/cartao/remove/:iddocartao', (req, res) => {
    const iddocartao = req.params.iddocartao

    const sql = `DELETE FROM cartao WHERE iddocartao = ${iddocartao} `

    conn.query(sql, function (err) {
        if (err) {
            console.log(err)
            return
        }
        res.redirect('/cart')
        console.log("excluido com sucesso")
    })
})

// busca de resgistro na tabela cartao
app.post('/buscarcart/', (req, res) => {
    const iddocartao = req.body.iddocartao

    const sql = `SELECT * FROM cartao WHERE iddocartao = ${iddocartao}`

    conn.query(sql, function (err, data) {
        if (err) {
            console.log(err)
            return
        }
        const listarCartao = data[0]
        res.render('cartao', { layout: false, listarCartao })
    })
})



// inserir dados na tabela contas
app.post('/cont/insertcont', (req, res) => {
    const nome_cliente = req.body.nome_cliente
    const id_do_cliente = req.body.id_do_cliente
    const tipo_de_conta = req.body.tipo_de_conta
    const saldo = req.body.saldo
    const id_da_agencia = req.body.id_da_agencia

    const sql = `INSERT INTO contas (nome_cliente,id_do_cliente,tipo_de_conta,saldo,id_da_agencia) VALUES ('${nome_cliente}','${id_do_cliente}','${tipo_de_conta}','${saldo}','${id_da_agencia}')`

    conn.query(sql, function (err) {
        if (err) {
            console.log(err)
        }
        res.redirect('/')
        console.log("Cadastro com sucesso")
    })
})

// consulta geral da tabela contas
app.get('/cont', (req, res) => {

    const sql = 'SELECT * FROM contas'
    conn.query(sql, function (err, data) {
        if (err) {
            console.log(err)
            return
        }
        const listar = data
        console.log(listar)
        res.render('cont', { layout: false, listar })
    })
})

// consulta um registro pelo id(produto.handlebars) da tabela contas
app.get('/cont/:id_da_conta', (req, res) => {
    const id_da_conta = req.params.id_da_conta

    const sql = `SELECT * FROM contas WHERE id_da_conta = ${id_da_conta}`

    conn.query(sql, function (err, data) {
        if (err) {
            console.log(err)
            return
        }
        const listarCont = data[0]
        res.render('contas', { layout: false, listarCont })
    })
})


// pegando para editar registro da tabela contas
app.get('/cont/editCont/:id_da_conta', (req, res) => {
    const id_da_conta = req.params.id_da_conta
    const sql = `SELECT * FROM contas where id_da_conta = ${id_da_conta}`

    conn.query(sql, function (err, data) {
        if (err) {
            console.log(err)
            return
        }
        const cont = data[0]
        res.render('editCont', { layout: false, cont })
    })
})


// editando o registro com post na tabela contas
app.post('/cont/updatecont', (req, res) => {
    const id_da_conta = req.body.id_da_conta
    const nome_cliente = req.body.nome_cliente
    const id_do_cliente = req.body.id_do_cliente
    const tipo_de_conta = req.body.tipo_de_conta
    const saldo = req.body.saldo
    const id_da_agencia = req.body.id_da_agencia

    const sql = `UPDATE contas SET nome_cliente = '${nome_cliente}', id_do_cliente = '${id_do_cliente}', tipo_de_conta = '${tipo_de_conta}', saldo = '${saldo}', id_da_agencia = '${id_da_agencia}' WHERE id_da_conta = ${id_da_conta}`

    conn.query(sql, function (err) {
        if (err) {
            console.log(err)
            return
        }
        res.redirect('/cont')
    })
})

// deletar registro da tabela contas
app.get('/cont/remove/:id_da_conta', (req, res) => {
    const id_da_conta = req.params.id_da_conta

    const sql = `DELETE FROM contas WHERE id_da_conta = '${id_da_conta}'`

    conn.query(sql, function (err) {
        if (err) {
            console.log(err)
            return
        }
        res.redirect('/cont')
    })
})

// busca de resgistro da tabela contas
app.post('/buscconta/', (req, res) => {
    const id_da_conta = req.body.id_da_conta

    const sql = `SELECT * FROM contas WHERE id_da_conta = ${id_da_conta}`

    conn.query(sql, function (err, data) {
        if (err) {
            console.log(err)
            return
        }
        const listarCont = data[0]
        res.render('contas', { layout: false, listarCont })
    })
})

//conexao com o banco de dados
const conn = mysql.createConnection({
    host: 'localhost',
    port: '3306',
    user: 'root',
    password: '',
    database: 'banco'

})

app.post('/login', (req, res) => {
    const {email , cpf  } = req.body

  
    conn.query('SELECT * FROM clientes WHERE email = ? AND cpf = ?', [email, cpf], (error, results, fields) => {
      if (error) throw error;
  
      if (results.length > 0) {
        req.session.login = cpf
        console.log(`CPF ${cpf} autenticado`);
        res.render('home', {login: cpf})
         } else {
        res.send('E-mail ou CPF inválidos');
      }
    })
  });

  app.get('/', (req, res)=>{
    if(req.session.login){
        res.render('main', {login: cpf});
        console.log('O meu usuario logado é: '+ req.session.login);

  }else{
    res.render('não logado');
  }
  })



conn.connect(function (err) {
    if (err) {
        console.log(err)
    }

    console.log("Conectado com sucesso!")
});

// servidor
app.listen(port, () => {
    console.log(`app rodando ${port}`)
});


