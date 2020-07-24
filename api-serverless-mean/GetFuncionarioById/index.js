const createMongoClient = require('../shared/mongo');
const { ObjectID } = require('mongodb');

module.exports = async function (context, req) {
    const funcionario = req.body || {};
    const id = req.params.id;

    if (!id) {
        context.res = {
            status: 400,
            body: 'Os ID do(a) funcionário(a) é obrigatório!'
        }

        return;
    }

    const { db, connection } = await createMongoClient();

    const Funcionarios = db.collection('funcionarios');

    try {
        const body = await Funcionarios.findOne({ _id: ObjectID(id)});
        connection.close();

        context.res = {
            status: 200,
            body
        }
    } catch (error) {
        context.res = {
            status: 500,
            body: 'Erro ao listar funcionário(a)'
        }
    }
}