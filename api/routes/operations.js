const server = require('express').Router();
const {Operation, Category} = require("../models/index");
const middleWareJsonToken = require("../utils/jwt")

server.use(middleWareJsonToken)

server.post('/create', async function (req,res){
   
    if(req.body.amount==null || req.body.amount==undefined){
        return res.json({err:'El monto no puede ser vacío'})
    }
    if(req.body.operation==null || req.body.operation==undefined){
        return res.json({err:'La operación debe ser definida'})
    }
    if(req.body.name==null || req.body.name==undefined){
        return res.json({err:'La categoría debe ser definida'})
    }
    
    if(req.body.operation.trim().length==0){
        return res.json({err:'La operación debe ser definida'})
    }

    if(req.body.name.trim().length==0){
        return res.json({err:'La categoría debe ser definida'})
    }

    if(isNaN(req.body.amount)==true){
        return res.json({err:'La cantidad debe ser numerica'})
    }

    if(req.body.operation.toLowerCase()!="ingreso" && req.body.operation.toLowerCase()!="egreso"){
        return res.json({err:'La operación no es válida'})
    }

    if(req.body.name.toLowerCase()!="compras" && req.body.name.toLowerCase()!="entretenimiento" && req.body.name.toLowerCase()!="restaurantes y bares" && req.body.name.toLowerCase()!="salud y deporte" && req.body.name.toLowerCase()!="sin categoria" && req.body.name.toLowerCase()!="servicios" && req.body.name.toLowerCase()!="supermercado" && req.body.name.toLowerCase()!="transporte" && req.body.name.toLowerCase()!="vacaciones"){
        return res.json({err:'La operación no es válida'})
    }
    
    const cat = await Category.findOne({where:{name:req.body.name}})
    const op = await Operation.create({amount:req.body.amount,date: new Date(), operation: req.body.operation, userId: req.body.decoded.user.id, categoryId:cat.id, concept:req.body.concept})
    return res.json(op)
    //op.addCategory(cat)
})

server.put('/update', async function (req,res){
    const op = await Operation.findOne({
        where:{
            id: req.body.id
        }
    })

    if(op == null){
        return res.json({
            err: "No se encontro la operación"
        })
    }

    op.amount= req.body.amount
    op.concept= req.body.concept
    op.save()
    return res.json({
        operation: op
    })
})

server.delete('/delete', async function(req,res){
    const affectedRows = await Operation.destroy({where:{id:req.body.idOp}})
    if(affectedRows==0){
        return res.json({
            err: "No existe el id"
        })
    }

    return res.json({message:"La operacion ha sido eliminada con exito"})
})

server.get('/', async function(req,res){

    if(req.query.search){
        const cat = await Category.findOne({
            where: {
                name: req.query.search
            }
        })

        if(cat==null){
            return res.json({err: "La categoría no existe"})
        }

        const ops = await Operation.findAll({
            where:{
                categoryId: cat.id,
                userId: req.body.decoded.user.id
            },
            limit:10,
            order:[["id","DESC"]]
        })
        
        if(ops==null){
            return res.json({err: "No se encontraron operaciones con esa categoría"})
        }

        return res.json({operations:ops})
    }

    const ops = await Operation.findAll({where:{userId:req.body.decoded.user.id},limit:10,order:[["id","DESC"]]})
    if(ops===null){
        return res.json({err:"No se encontraron operaciones"})
    }else{
        return res.json({operations:ops})
    }
})

server.get("/categories", async function(req, res) {
    const categories = await Category.findAll()

    res.json({
        categories
    })
})

server.get("/total", async function(req, res) {
    const ops = await Operation.findAll({where:{userId:req.body.decoded.user.id}})
    
    if(ops===null){
        return res.json({err:"No se encontraron operaciones"})
    }else{
        return res.json({operations:ops})
    }
})

module.exports = server;