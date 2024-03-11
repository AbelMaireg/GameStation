import { Router } from 'express';

abstract class _Router {
  protected router: Router;

  constructor() {
    this.router = Router();
    this.setupRoutes();
  }

  protected abstract setupRoutes(): void;

  public getRouter(): Router {
    return this.router;
  }
}

export default _Router;
