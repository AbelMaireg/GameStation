import { playGround } from '../../../Src/app';
import request from 'supertest';

describe('API: register new game', () => {

    it('should return game registerd successfully', async () => {

        const response = await request(playGround.getApp)
            .post('/game/registernewgame')
            .send({
                name: 'Minesweeper'
            });

        expect(response.status).toBe(201);
        expect(response.text).toBe('successful');

        const response2 = await request(playGround.getApp)
            .post('/game/registernewgame')
            .send({
                name: 'Soduku'
            });

        expect(response2.status).toBe(201);
        expect(response2.text).toBe('successful');

    });
})
