import * as path from 'path';

import * as express from 'express';
import * as nunjucks from 'nunjucks';

export class Nunjucks {
  constructor(public developmentMode: boolean) {
    this.developmentMode = developmentMode;
  }

  enableFor(app: express.Express): void {
    app.set('view engine', 'njk');
    const nunjucksEnv = nunjucks.configure(path.join(__dirname, '..', '..', 'views'), {
      autoescape: true,
      watch: this.developmentMode,
      express: app,
    });

    // Add custom filters
    nunjucksEnv.addFilter('yesNo', (value: boolean) => (value ? 'Yes' : 'No'));

    app.use((req, res, next) => {
      res.locals.pagePath = req.path;
      next();
    });
  }
}
