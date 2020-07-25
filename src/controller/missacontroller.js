const Missa = require('../model/Missa')

module.exports = {

    async index(req, res) {
        const { missa: missaId } = req.headers
        const missa = await Missa.findById(missaId)
        let pessoas = missa.pessoas
        missa.pessoas = await pessoas.sort()
        return res.json(missa)
    },

    async missas(req, res) {
        const missa = await Missa.find({}, { pessoas: 0 })
        return res.json(await missa.reverse())
    },

    async addpessoa(req, res) {
        const { missa: missaId } = req.headers
        const { pessoa } = req.body
        const missa = await Missa.findById(missaId)
        if (missa.numero >= 100) {
            return res.json({ error: 'Número de pessoas exedido' })
        } else {
            if (!pessoa) {
                return res.json({ error: 'Insira um nome' })
            } else {
                await missa.pessoas.push(pessoa)
                missa.numero = missa.numero + 1
                await missa.save()
                return res.json({ sucess: 'Nome Adicionado' })
            }
        }
    },

    async store(req, res) {

        const { dia, semana, horas } = req.body;

        if (dia && semana && horas) {
            const missa = await Missa.create({
                dia,
                semana,
                horas,
                numero: 0
            })
            if(missa){
                return res.json({ sucess: 'Missa Adicionada!' })   
            }
        }else{
            return res.json({ error: 'Insira todos os dados!' })
        }


        if (!missa) {
            return res.json({ error: "Não foi possivel salvar" })
        } else {
            return res.json({ sucess: 'Missa Adicionado' })
        }

    },

    async delete(req, res) {

        const { missa: missaId } = req.headers
        const response = await Missa.findByIdAndDelete(missaId)
        return res.json(response)
    }

}