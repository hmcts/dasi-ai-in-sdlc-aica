import express from 'express';
import path from 'path';
import nunjucks from 'nunjucks';
import i18n from 'i18n';
import routes from './routes';

const app = express();
const PORT = process.env.PORT || 3000;

console.log('Starting server setup...');


//Nunjucks view locations
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'njk');

//Locale Config
i18n.configure({
  locales: ['en', 'cy'],
  defaultLocale: 'en',
  directory: path.join(__dirname, 'locales'),
  autoReload: true,
  updateFiles: false,
  syncFiles: false
});
app.use(i18n.init);

// Nunjucks Config
nunjucks.configure([
  path.join(__dirname, 'views'),
  path.join(__dirname, '../node_modules/govuk-frontend/dist')
], {
  autoescape: true,
  express: app
});


app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  next();
});

//Locale Config (en - English / cy - Welsh)
app.use((req, res, next) => {
  if (req.query.lng) {
    i18n.setLocale(req, req.query.lng as string);
    console.log(`Locale switched to: ${req.query.lng}`);
  }
  next();
});

app.use(express.static(path.join(__dirname, '../public')));
app.use('/assets', express.static(path.join(__dirname, '../node_modules/govuk-frontend/dist/govuk/assets')));
app.use('/javascripts', express.static(path.join(__dirname, '../node_modules/govuk-frontend/dist/govuk')));
app.use('/stylesheets', express.static(path.join(__dirname, '../node_modules/govuk-frontend/dist/govuk')));
app.use(express.urlencoded({ extended: true }));

routes(app);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
