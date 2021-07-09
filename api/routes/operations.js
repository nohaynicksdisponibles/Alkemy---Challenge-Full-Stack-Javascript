const server = require('express').Router();
const {User, Operation, Category} = require("../models/index");
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

    if(req.body.amount.trim().length==0){
        return res.json({err:'El monto no puede ser vacío'})
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
    const op = await Operation.create({amount:req.body.amount,date: new Date(), operation: req.body.operation})
    op.addCategory(cat)
})

server.put('/update', async function (req,res){
    
})

server.delete('/delete', async function(req,res){
    // validar del mismo usuario
    const user = await User.findOne({where:{id:req.body.id},include: Operation})
    return res.json(user);
    const affectedRows = await Operation.destroy({where:{id:req.body.idOp}})
    if(affectedRows==0){
        return res.json({
            err: "No existe el id"
        })
    }
})

server.get('/operaciones', async function(req,res){
    const user=await User.findOne({where:{id:req.body.id},include: Operation})
    if(user===null){
        return res.json({err:"Usuario no encontrado"})
    }else{
        return res.json({operations:user.operations})
    }
})

server.get('/ingresos', async function(req,res){
    const user=await User.findOne({where:{id:req.body.id},include: Operation})
    if(user===null){
        return res.json({err:"Usuario no encontrado"})
    }else{
        const ingresos = user.operations.filter(op=>op.operation=='ingreso')
        return res.json({operations:ingresos})
    } 
})

server.get('/egresos', async function(req,res){
    const user=await User.findOne({where:{id:req.body.id},include: Operation})
    if(user===null){
        return res.json({err:"Usuario no encontrado"})
    }else{
        const egresos = user.operations.filter(op=>op.operation=='egreso')
        return res.json({operations:egresos})
    }
})

module.exports = server;