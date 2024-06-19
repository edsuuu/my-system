import { Request, Response } from 'express';
import mongoose from 'mongoose';
import ContaModel, { IConta } from '../../models/contamodel';

interface MongoError extends Error {
    code?: number;
}


class ContaController {

    async store(req: Request, res: Response): Promise<Response> {
        try {
            const novaConta = new ContaModel(req.body as IConta);

            await novaConta.validate();
            await novaConta.save();

            const { dono_conta, login_conta } = novaConta;

            return res.status(201).json({
                msg: 'Conta cadastrada com sucesso',
                conta_cadastrada: { dono_conta, login_conta },
            });
        } catch (error) {
            const mongoError = error as MongoError;
            if (mongoError instanceof mongoose.Error.ValidationError) {
                const validationErrors = Object.values(mongoError.errors).map(err => (err as mongoose.Error.ValidatorError).message);
                return res.status(400).json({ errors: validationErrors });
            } else if (mongoError.code === 11000) {
                return res.status(400).json({ error: 'Login já existe' });
            } else {
                console.error('Erro ao criar conta:', mongoError);
                return res.status(500).json({ error: 'Erro interno do servidor' });
            }
        }
    }

    async index(req: Request, res: Response): Promise<Response> {
        try {
            const listarContas = await ContaModel.find({}, { __v: 0 }).exec();
            return res.status(200).json(listarContas);
        } catch (error) {
            return res.status(500).json(null);
        }
    }

    async update(req: Request, res: Response): Promise<Response> {
        try {
            const { id } = req.params;

            const contaAtualizada = await ContaModel.findByIdAndUpdate(id, req.body as IConta, { new: true }).exec();

            if (!contaAtualizada) {
                return res.status(404).json({ errors: ['Conta não encontrada'] });
            }

            const { dono_conta, login_conta, senha_conta } = contaAtualizada;

            return res.status(200).json({
                msg: 'Conta atualizada com sucesso',
                conta_atualizada: { dono_conta, login_conta, senha_conta }
            });
        } catch (error) {
            const mongoError = error as MongoError;
            if (mongoError instanceof mongoose.Error.CastError && mongoError.kind === 'ObjectId') {
                return res.status(400).json({ error: 'Este ID não existe.' });
            } else {
                return res.status(500).json({ error: 'Ocorreu um erro interno.' });
            }
        }
    }

    async delete(req: Request, res: Response): Promise<Response> {
        try {
            const { id } = req.params;

            const conta = await ContaModel.findById(id).exec();

            if (!conta) {
                return res.status(404).json({ errors: ['Conta não encontrada'] });
            }

            await ContaModel.deleteOne({ _id: id }).exec();

            return res.status(200).json({
                msg: 'Conta deletada com sucesso',
                conta_deletada: conta.login_conta,
            });
        } catch (error) {
            const mongoError = error as MongoError;
            if (mongoError instanceof mongoose.Error.CastError && mongoError.kind === 'ObjectId') {
                return res.status(400).json({ error: 'Este ID não existe.' });
            } else {
                return res.status(500).json({ error: 'Ocorreu um erro interno.' });
            }
        }
    }
}

export default new ContaController();
