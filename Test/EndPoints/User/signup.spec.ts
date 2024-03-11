import { playGround } from '../../../Src/app';
import Service from '../../../Src/Service/index';

import request from 'supertest'

describe('API: signup', () => {
    beforeAll(async () => {
        await Service.gameStation.executeQuery('CALL resetDatabase()');
    });

    it('should return unsuppoted field', async () => {

        const response = await request(playGround.getApp)
            .post('/user/signup')
            .send({
                username: "JohnDoe",
                password: "1234123121",
                age: 12
            });

        expect(response.status).toBe(406);
        expect(response.text).toBe('unsupported field');
    });

    it('should return successfully registered', async () => {
        const response = await request(playGround.getApp)
            .post('/user/signup')
            .send({
                username: "JohnDoe",
                password: "1234123121"
            });

        expect(response.status).toBe(201);
        expect(response.text).toBe('successfully registered');
    });

    it('should return username is unavailable', async () => {
        const response = await request(playGround.getApp)
            .post('/user/signup')
            .send({
                username: "JohnDoe",
                password: "1234123121"
            });

        expect(response.status).toBe(200);
        expect(response.text).toBe('username is unavailable');
    })
})
