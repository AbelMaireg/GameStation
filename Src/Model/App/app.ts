import express, { Express, Request, Response } from "express";
import bodyParser from "body-parser";
import UserRouter from "../../Routes/user";
import RegisterNewGameRouter from "../../Routes/game";
import Database from "../../Model/Database/database";

class App {
	private app: Express;
	private gameStation: Database;

	constructor() {
		this.app = express();
		this.gameStation = new Database(
			"localhost",
			"root",
			"6006174009010",
			"GameStation"
		);

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
        const userRouter = new UserRouter(this.gameStation);
        this.app.use('/user', userRouter.getRouter());

        const registerGameRouter = new RegisterGameRouter(this.gameStation);
        this.app.use('/game', registerGameRouter.getRouter());
	}

	public start(port: number): void {
		this.app.listen(port, () => {
			console.log(`Server is running on port ${port}`);
		});
	}
}

export default App;
