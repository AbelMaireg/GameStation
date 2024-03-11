import express, { Express } from "express";
import bodyParser from "body-parser";
import Router from "./Routes/index";

class App {

	private app: Express;


	constructor() {

		this.app = express();

		this.setupMiddlewares();

		this.setupRoutes();

	}

	public get getApp(): Express {

		return this.app;

	}

	private setupMiddlewares(): void {

		this.app.use(bodyParser.json());

	}

	private setupRoutes(): void {

        const userRouter = new Router.UserRouter();
        this.app.use('/user', userRouter.getRouter());

        const insertGame = new Router.GameRouter();
        this.app.use('/game', insertGame.getRouter());

	}

	public start(port: number): void {

		this.app.listen(port, () => {

			console.log(`Server is running on port ${port}`);

		});

	}

}

const playGround = new App();
const PORT = 3000;
playGround.start(PORT);

export { playGround };
