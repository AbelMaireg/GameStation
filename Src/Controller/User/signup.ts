import { Request, Response } from 'express';
import Joi from 'joi';
import Service from '../../Service/index';

let validatorFormat = Joi.object({
    
    username: Joi.string().min(1).required(),
    password: Joi.string().min(8).required(),

});


export default async(req: Request, res: Response): Promise<void> => {

    if (!Service.validateRequest(validatorFormat, req.body)) {
        
        res.status(406).send('unsupported field');
        return;

    }

    try {

        req.body.password = await Service.encryptPassword(req.body.password);

    } catch(e) {

        res.status(500).send('server error');
        return;

    }

    try {

        await Service.gameStation.executeQuery(`CALL i_insertUser(?, ?)`, [req.body.username, req.body.password]);

    } catch (e: any) {

        if (e.code == 'ER_DUP_ENTRY')
        res.send('username is unavailable');
        return;

    }

    res.status(201).send('successfully registered');

};
