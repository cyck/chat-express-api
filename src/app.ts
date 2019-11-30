
import createError, { HttpError } from 'http-errors';
import express, { Request, Response, Router } from 'express';
import appRoot from 'app-root-path';
import path from 'path';
import cookieParser from 'cookie-parser';
import requestsLogger from 'morgan';
import debug from 'debug';
import * as routers from './components';
import { NextFunction } from 'connect';

const logger = debug('chat-express-api:app');
const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(requestsLogger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(`${appRoot}`, 'public')));

app.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });
});

function registerRouter([path, router]: [string, Router]) {
  const route = `/${path}`;
  app.use(route, router);
  logger(`registered route ${route}`);
}

Object.entries(routers).forEach(registerRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err: HttpError, req: Request, res: Response, next: NextFunction) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  res.status(err.status || 500).send(err);
});

export default app;
