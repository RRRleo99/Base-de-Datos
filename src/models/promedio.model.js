import mongoose from "mongoose";
import  mongoosePaginate  from "mongoose-paginate-v2";

const promedioSchema = new mongoose.Schema({
    nombre:String,
    apellido:String,
    email:String,
    sexo:String,
    promedio:Number,
    condicion:String
})

promedioModel.plugin(mongoosePaginate)
const promedioModel = mongoose.model("estudiantes", promedioSchema)

export default promedioModel;