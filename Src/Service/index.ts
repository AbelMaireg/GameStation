import encryptPasswordService from './encryptpassword'; 
import validateRequestService from './validator';
import database from './database';

namespace Service {

    export const encryptPassword = encryptPasswordService;
    
    export const validateRequest = validateRequestService;

    export const gameStation = database;

}

export default Service;
