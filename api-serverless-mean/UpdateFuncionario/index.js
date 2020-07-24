const createMongoClient = require('../shared/mongo');
const { ObjectID } = require('mongodb');

module.exports = async function (context, req) {
    const funcionario = req.body || {};
    const { id } = req.params;

    if (!id || !funcionario) {
        context.res = {
            status: 400,
            body: 'Os campos são obrigatórios!'
        }

        return;
    }

    const { db, connection } = await createMongoClient();
    const Funcionarios = db.collection('funcionarios');

    try {
        const funcionarios = await Funcionarios.findOneAndUpdate(
            { _id: ObjectID(id) },
            { $set: funcionario }
        );
        connection.close();

        context.res = {
            status: 200,
            body: funcionarios
        }
    } catch (error) {
        context.res = {
            status: 500,
            body: 'Erro ao listar funcionário(a)'
        }
    }
}