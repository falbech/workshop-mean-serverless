const createMongoClient = require('../shared/mongo');

module.exports = async function (context, req) {
    const funcionario = req.body || {};

    if (!Object.keys(funcionario).length) {
        context.res = {
            status: 400,
            body: 'Os dados do(a) funcionário(a) são obrigatórios!'
        }
        return;
    }

    const { db, connection } = await createMongoClient();

    const Funcionarios = db.collection('funcionarios');

    try {
        const funcionarios = await Funcionarios.insert(funcionario);
        connection.close();

        context.res = {
            status: 201,
            body: funcionarios.ops[0]
        }
    } catch (error) {
        context.res = {
            status: 500,
            body: 'Erro ao criar funcionário(a)'
        }
    }
}