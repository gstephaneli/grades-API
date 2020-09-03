import { db } from '../models/index.js';
import { logger } from '../config/logger.js';

const GradesModel = db.grades;

const create = async (req, res) => {
  console.log('req.body', req.body)
  try {
    const newGrade = new GradesModel({
      name: req.body.name,
      subject: req.body.subject,
      type: req.body.type,
      value: req.body.value
    })

    const dataSave = await newGrade.save();
    res.send({ message: 'Grade inserida com sucesso', dataSave });
    logger.info(`POST /grade - ${JSON.stringify(dataSave)}`);
  } catch (error) {
    res
      .status(500)
      .send({ message: error.message || 'Algum erro ocorreu ao salvar' });
    logger.error(`POST /grade - ${JSON.stringify(error.message)}`);
  }
};

const findAll = async (req, res) => {
  const name = req.query.name;

  //condicao para o filtro no findAll
  var condition = name
    ? { name: { $regex: new RegExp(name), $options: 'i' } }
    : {};

  try {
    const grades = await GradesModel.find(condition);
    if(!grades){
      throw new Error(`Grade not found to delete`)
    }
    res.send(grades);
    logger.info(`GET /grade`);
  } catch (error) {
    res
      .status(500)
      .send({ message: error.message || 'Erro ao listar todos os documentos' });
    logger.error(`GET /grade - ${JSON.stringify(error.message)}`);
  }
};

const findOne = async (req, res) => {
  const id = req.params.id;

  try {
    const gradeDB = await GradesModel.findById({_id:id})
    if(!gradeDB){
      throw new Error(`Grade not found to delete`)
    }
    console.log('gradeDB', gradeDB)

    res.status(200).send(gradeDB);
    logger.info(`GET /grade - ${id}`);
  } catch (error) {
    res.status(500).send({ message: 'Erro ao buscar o Grade id: ' + id });
    logger.error(`GET /grade - ${JSON.stringify(error.message)}`);
  }
};

const update = async (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: 'Dados para atualizacao vazio',
    });
  }

  const id = req.params.id;

  const upGrade = {
    name: req.body.name,
    subject: req.body.subject,
    type: req.body.type,
    value: req.body.value
  }

  const grade = await GradesModel.findOneAndUpdate({_id:id},upGrade,{new: true})
  console.log('gradeUP', grade)
  if(!grade){
    throw new Error(`Grade not found to update`)
  }
  try {
    res.status(200).send({ message: 'Grade atualizada'});

    logger.info(`PUT /grade - ${id} - ${JSON.stringify(upGrade)}`);
  } catch (error) {
    res.status(500).send({ message: 'Erro ao atualizar a Grade id: ' + id });
    logger.error(`PUT /grade - ${JSON.stringify(error.message)}`);
  }
};

const remove = async (req, res) => {
  const id = req.params.id;

  try {
    const gradeDeleted = await GradesModel.findByIdAndDelete({_id:id})
    if(gradeDeleted.deletedCount && gradeDeleted.deletedCount <=0){
      throw new Error(`Grade not found to delete`)
    }

    res.status(200).send({ message: 'Grade deletada'});
    logger.info(`DELETE /grade - ${id}`);
  } catch (error) {
    res
      .status(500)
      .send({ message: 'Nao foi possivel deletar o Grade id: ' + id });
    logger.error(`DELETE /grade - ${JSON.stringify(error.message)}`);
  }
};

const removeAll = async (req, res) => {
  try {

    const gradesDeleted = await GradesModel.deleteMany({})
    if(gradesDeleted.deletedCount && gradesDeleted.deletedCount <=0){
      throw new Error(`The Grades is not delete`)
    }

    res.status(200).send({ message: 'Grades deletadas'});
    logger.info(`DELETE /grade`);
  } catch (error) {
    res.status(500).send({ message: 'Erro ao excluir todos as Grades' });
    logger.error(`DELETE /grade - ${JSON.stringify(error.message)}`);
  }
};

export default { create, findAll, findOne, update, remove, removeAll };
