import express from "express";
import exphbs from "express-handlebars";
import mongoose from "mongoose";
import promedioModel from "./models/promedio.model.js";

const app = express();
const PUERTO = 5173;

app.use(express.json())
app.use(express.urlencoded({extends:true}))
app.engine("handlebars",exphbs.engine())
app.set("view engine","handlebars")
app.set("views", "./src/views")

const main = async ()=>{
    mongoose.connect("mongodb+srv://leonelrivero:leoleoleobd@cluster0.pdrx1je.mongodb.net/coderhouse?retryWrites=true&w=majority&appName=Cluster0");


const resultado = await promedioModel.paginate({"condicion" : "aprobado"},{limit:2 , page:2})
console.log(resultado)

}


// mongoose.connect("mongodb+srv://leonelrivero:leoleoleobd@cluster0.pdrx1je.mongodb.net/coderhouse?retryWrites=true&w=majority&appName=Cluster0");


app.get("/estudiantes", async (req, res)=>{
    let page = req.query.page || 1;
    let limit = 2;

    try{
    const ListadoDeEstudiantes = await promedioModel.paginate({},{limit, page})

        const estudiantesTotal = ListadoDeEstudiantes.docs.map(estudiantes =>{
            const{_id, ...rest} = estudiantes.toObject() 
            return rest;
        })
        res.render("estudiantes",{
            estudiantes: estudiantesTotal,
            hasPrevPage: ListadoDeEstudiantes.hasPrevPage,
            hasNextPage: ListadoDeEstudiantes.hasNextPage,
            PrevPage: ListadoDeEstudiantes.PrevPage,
            NextPage: ListadoDeEstudiantes.NextPage,
            currentPage: ListadoDeEstudiantes.page,
            totalPages: ListadoDeEstudiantes.totalPages

        })
    }
    catch(error){
        console.log(error)
        res.status(500).send("no responde")
    }
    
    
})

 app.listen(PUERTO,()=>{
    console.log("escuchamos puerto 5173")
 })