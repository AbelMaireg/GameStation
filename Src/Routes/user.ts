import _Router from '../Model/Router/router';
import Database from '../Model/Database/database'
import { Request, Response } from 'express';
import Joi from 'joi';
import bcrypt from 'bcrypt';

const userSignupFormat = Joi.object({
    username: Joi.string().min(1).required(),
    password: Joi.string().min(8).required(),
});

class UserRouter extends _Router {
    protected database: Database;

    constructor(database: Database) {
        super();
        this.database = database;
    };

    protected setupRoutes(): void {
        this.router.post('/signup', async (req: Request, res: Response) => {
            let payload  = {
                username: req.body.username,
                password: req.body.password
            }
            
            console.log('payload', payload);

            const format = userSignupFormat.validate(req.body);
            
            if (format.error) {
                res.status(406).send('unsupported field');
                return;
            }

            try {
                payload.password = await this.encryptPassword(payload.password);
                console.log('payload Password', payload.password);
            } catch(e) {
                res.status(500).send('server error');
                return;
            }

            let result: any;
            try {
                result = await this.database.executeQuery(`CALL i_insertUser(?, ?)`, [payload.username, payload.password]);
                console.log(result);
            } catch (e: any) {
                if (e.code == 'ER_DUP_ENTRY')
                    res.send('username is unavailable');
                return;
            }

            res.status(201).send('successfully registered');
        });
    };

    protected async encryptPassword(password: string): Promise<string> {
        try {
            const encrypted = await bcrypt.hash(password, 10);
            return encrypted;
        } catch (e) {
            console.error(e);
            throw e;
        }
    }
}

export default UserRouter;
