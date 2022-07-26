interface Tarefa {
  id: Number;
  conteudo: string;
  realizado: boolean;
  created_at: Date;
  update_at: Date;
}
const tarefa = require('../database/model');
const listar = async () => {
  try {
    const dados: Tarefa = await tarefa.findAll({
      raw: true,
      order: [['createdAt', 'DESC']],
    });
    // console.log(dados);
    return dados;
  } catch (err: any) {
    throw new Error(err);
  }
};
const add = async (
  id: number | String,
  conteudo: string,
  realizada: boolean
) => {
  try {
    console.log('dados enviados ' + id + ' ' + conteudo + ' ' + realizada);
    const dados: Tarefa = await tarefa.create({
      id,
      conteudo,
      realizada,
    });
    return dados;
  } catch (err: any) {
    throw new Error(err);
  }
};
const modificar = async (id: number, realizada: boolean) => {
  try {
    const { conteudo } = await tarefa.findOne({
      raw: true,
      where: { id: id },
    });

    const dados: Tarefa = await tarefa.update(
      {
        id,
        conteudo,
        realizada,
      },
      {
        where: {
          id: id,
        },
      }
    );

    return dados;
  } catch (err: any) {
    throw new Error(err);
  }
};
const deletar = async (id: number) => {
  try {
    const dados: Tarefa = await tarefa.destroy({
      where: {
        id: id,
      },
    });
    return dados;
  } catch (err: any) {
    throw new Error(err);
  }
};
const deletarTudo = async () => {
  try {
    const dados: Tarefa = await tarefa.destroy({
      truncate: true,
      cascade: false,
    });
    return dados;
  } catch (err: any) {
    throw new Error(err);
  }
};
module.exports = {
  add,
  modificar,
  deletar,
  listar,
  deletarTudo,
};
