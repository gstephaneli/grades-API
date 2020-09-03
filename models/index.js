import mongoose from 'mongoose';
import dotenv from 'dotenv'
import GradesModel from './gradesModel.js'

dotenv.config()

const db = {};
db.mongoose = mongoose;
db.url = process.env.MONGODB;
db.grades = GradesModel(mongoose)

export { db };
