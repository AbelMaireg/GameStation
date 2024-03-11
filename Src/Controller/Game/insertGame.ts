import { Request, Response } from 'express';
import Service from '../../Service/index';

export default async (req: Request, res: Response) => {

    try {

        await Service.gameStation.executeQuery('CALL i_insertGame(?)', [ req.body.name ]);

    } catch (e: any) {

        res.status(403).send('game already existed');
        console.log(e);
        return; 

    };

    res.status(201).send('successful');

};
