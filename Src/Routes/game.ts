import Type from '../Types/index';
import Controller from '../Controller/index';

export default class extends Type._Router {
    
    protected setupRoutes(): void {

        this.router.post('/registernewgame', Controller.insertGame);

    };
};
