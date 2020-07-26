const express = require('express');
const router = express.Router();
const missa = require('./controller/missacontroller')

router.get('/server', (req, res) => {

    return res.json({ message: `Muito Bem!Tudo funcionando!!!` });
});

router.get('/missa', missa.index)
router.get('/missas', missa.missas)
router.post('/missa', missa.store)
router.post('/pessoa', missa.addpessoa)
router.delete('/missa', missa.delete)
router.post('/login', (req, res)=>{
    const { user, senha } = req.body

    if(user == "saobento" || user =="Saobento" && senha == "paroquiasbs"){
        return res.json({ sucess: 'Redirecionando' })
    }else{
        return res.json({ error: 'Dados incorretos!' })
    }
})

module.exports = router;