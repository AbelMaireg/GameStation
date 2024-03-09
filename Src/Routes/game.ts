import _Router from '../Model/Router/router';
import Database from '../Model/Database/database';
import { Request, Response } from 'express';
import Joi from 'joi';

class RegisterNewGame extends _Router {
    private database: Database;

    private validatorModel = Joi.object({
        name: Joi.string().required()
    });

    constructor(database: Database) {
        super();
        this.database = database;
    }

    protected setupRoutes(): void {
        this.router.post('/registerNewGame', async (req, res) => {
            console.log("req.body: ", req.body);

            const format = this.validatorModel.validate(req.body);

            if (format.error) {
                console.log('format.error: ', format.error);
                res.status(406).send("unsupported field");
                return;
            }

            let result: any;
            try {
                result = await this.database.executeQuery('CALL i_Game(?)', [ req.body.name ])
                console.log('result: ', result);
            } catch (e) {
                console.log('error: ', e);
                return; 
            };

            res.status(201).send('game successfully registered');
        });
    };
};

export default RegisterNewGame;
