import express from 'express';
import { getContacts, createContact, deleteContact  } from '../services/contact.js';

const dataSource = './data/list.txt'

const router = express.Router();

router.post('/contato', async(req,res)=>{
    const {name} = req.body;

    if (!name || name.length < 2 ){
       return res.json({error : 'Nome necessita de ao menos 2 carácteres'});
    }

    await createContact(name);

    res.status(201).json({contato : name})
});


router.get('/contatos',async (req,res)=>{
    let list = await getContacts();
    
    res.json({contatos:list});
});


router.delete('/contato',async (req,res)=>{
    const {name} = req.query;
    if (!name){
        return res.json({error: 'Precisa inserir um nome para excluir'})
    }

    await deleteContact(name as string)
    res.json({contatos:name});


});

export default router;