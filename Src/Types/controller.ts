import Database from '../Types/database';
import { Request, Response } from 'express';
import Joi from 'joi';
const { encryptPassword, validateRequest } = require('../Service/index');

export class Signup {
    private database: Database;

    private validatorFormat = Joi.object({
        username: Joi.string().min(1).required(),
        password: Joi.string().min(8).required(),
    });

    constructor (database: Database) {
        this.database = database;
    };

    public async execute(req: Request, res: Response): Promise<void> {
        if (!validateRequest(this.validatorFormat, req.body)) {
            res.status(406).send('unsupported field');
            return;
        }

        try {
            req.body.password = await encryptPassword(req.body.password);
            // console.log('payload Password', payload.password);
        } catch(e) {
            res.status(500).send('server error');
            return;
        }

        let result: any;
        try {
            result = await this.database.executeQuery(`CALL i_insertUser(?, ?)`, [req.body.username, req.body.password]);
            // console.log(result);
        } catch (e: any) {
            // console.log(e);
            if (e.code == 'ER_DUP_ENTRY')
            res.send('username is unavailable');
            return;
        }

        res.status(201).send('successfully registered');

    };
};
