import homeRouter from './homeRouter';

import { Application } from 'express';

export default function (app: Application): void {
  // Use the home router for the root path
  homeRouter(app);
}
