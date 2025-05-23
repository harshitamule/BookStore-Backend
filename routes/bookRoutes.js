import express from 'express';
import {Book} from '../models/bookModel.js';

const router = express.Router();

//route to save a new book
router.post('/', async (req, res)=>{
    try{
        if(!req.body.title || !req.body.author ||!req.body.publishYear){
            return res.status(400).send({
                message: 'send all required fields: title, author, publishYear',
            });
        }

        const newBook = {
            title: req.body.title,
            author: req.body.author,
            publishYear: req.body.publishYear
        };

        const book = await Book.create(newBook);
        return res.status(201).send(book);

    }catch(err){
        console.log(err.message);
        res.status(500).send({
            message: err.message
        });
    }
}); 

//route to get all books from db
router.get('/', async(req, res) => {
    try{
        const books = await Book.find({});
        return res.status(200).json({
            count : books.length,
            data: books
        });
    }catch(err){
        console.log(err.message);
        res.status(500).send({message: err.message});
    }
})

//route to get one book from db
router.get('/:id', async(req, res) => {
    try{
        const {id} = req.params;
        const book = await Book.findById(id);
        return res.status(201).json(book)
    }catch(err){
        console.log(err.message);
        res.status(500).send({message: err.message})
    }
});

//route to update a book
router.put('/:id', async(req, res)=>{
    try{
        if(!req.body.title || !req.body.author || !req.body.publishYear){
            return res.status(404).send({message: 'send all required fields: title, author, publishYear'});
        }
        const {id} = req.params;
        const result = await Book.findByIdAndUpdate(id, req.body);
        //const result = await Book.updateOne({id}, req.body);


        if(!result){
            return res.status(404).json({message: 'book not found'});
        }

        return res.status(200).send({message: 'book updates successfully'});

    }catch(err){
        console.log(err.message);
        res.status(500).send({message: err.message});
    };
});

//route to delete a book
router.delete('/:id', async(req, res)=>{
    try{
        const {id} = req.params;
        const delBook = await Book.findByIdAndDelete(id);
        //const delBook = await Book.deleteOne({id});
        if(!delBook){
            return res.status(404).send({message: 'book not found'});
        }

        return res.status(200).send({message: 'books deleted successfully'});

    }catch(err){
        console.log(err.message);
        res.status(500).send({message: err.message});
    }
});

export default router;