const express = require('express');
const { Op } = require('sequelize');

const Category = require('../models/category')
const Product = require('../models/product');

const router = express.Router();

router.get('/categories', async(req,res,next) =>{
    try {
        const category = await Category.findAll({
            include : [{
                model : Product,
                raw : true,
            }]
        });
        res
            .status(200)
            .json({'message' : 'SUCCESS','result' : category})

    } catch(error){
        console.error(error);
        next.error(error);
    }
});

router.get('/', async(req,res,next) => {
    try {
        const filters = {};
        const category = req.query.category
        const keyword = req.query.keyword

        if (category) {
            filters.categoryId = category;
        };
        if (keyword) {
            filters.name = {[Op.like] : keyword}
        }

        const product = await Product.findAll({
            where : filters,
            raw : true
        });
        res
            .status(200)
            .json({'message' : 'SUCCESS','result' : product})

    } catch(error){
        console.error(error);
        next.error(error);
    }
})

router.get('/:id', async(req,res,next) => {
    try{
        const product = await Product.findAll({
            where :{
                id : req.params.id
            },
            include:{
                model : Category
            },
            raw : true,
        });
        res
            .status(200)
            .json({'message' : 'SUCCESS' , 'result' : product})

    }catch(error){
        console.error(error);
        next.error(error);
    }
})

module.exports = router;
