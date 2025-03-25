import { app } from '../../../main/app';

import { SinonSpy, spy } from 'sinon';
import request from 'supertest';

describe('GET /', () => {
  let spiedFunction: SinonSpy | undefined = undefined;
  beforeAll(function () {
    spiedFunction = spy(app, 'render');
  });
  afterAll(function () {
    spiedFunction?.restore();
  });
  test('/ should exist', async function () {
    const res = await request(app).get('/');
    expect(res.statusCode).toEqual(200);
  });
  test('should render the "home" view', function () {
    expect(spiedFunction?.getCall(0).args[0]).toEqual('home');
  });
});

describe('GET /search-option', () => {
  let spiedFunction: SinonSpy | undefined = undefined;
  beforeAll(function () {
    spiedFunction = spy(app, 'render');
  });
  afterAll(function () {
    spiedFunction?.restore();
  });
  test('/search-option should exist', async function () {
    const res = await request(app).get('/search-option');
    expect(res.statusCode).toEqual(200);
  });
  test('should render the "search/option" view', function () {
    expect(spiedFunction?.getCall(0).args[0]).toEqual('search/option');
  });
});

describe('GET /search-by-name', () => {
  let spiedFunction: SinonSpy | undefined = undefined;
  beforeAll(function () {
    spiedFunction = spy(app, 'render');
  });
  afterAll(function () {
    spiedFunction?.restore();
  });
  test('/search-by-name should exist', async function () {
    const res = await request(app).get('/search-by-name');
    expect(res.statusCode).toEqual(200);
  });
  test('should render the "search/location" view', function () {
    expect(spiedFunction?.getCall(0).args[0]).toEqual('search/location');
  });
});

describe('GET /service-choose-action', () => {
  let spiedFunction: SinonSpy | undefined = undefined;
  beforeAll(function () {
    spiedFunction = spy(app, 'render');
  });
  afterAll(function () {
    spiedFunction?.restore();
  });
  test('/service-choose-action should exist', async function () {
    const res = await request(app).get('/service-choose-action');
    expect(res.statusCode).toEqual(200);
  });
  test('should render the "choose-action" view', function () {
    expect(spiedFunction?.getCall(0).args[0]).toEqual('choose-action');
  });
});

describe('POST /search-option', () => {
  test('knowLocation=yes redirects to /search-by-name', async function () {
    const res = await request(app).post('/search-option').send({ knowLocation: 'yes' });
    expect(res.statusCode).toEqual(302);
    expect(res.get('location')).toEqual('/search-by-name');
  });
  test('knowLocation=no redirects to /service-choose-action', async function () {
    const res = await request(app).post('/search-option').send({ knowLocation: 'no' });
    expect(res.statusCode).toEqual(302);
    expect(res.get('location')).toEqual('/service-choose-action');
  });
  test('knowLocation=??> redirects to /services/search-by-postcode', async function () {
    const res = await request(app).post('/search-option').send({});
    expect(res.statusCode).toEqual(302);
    expect(res.get('location')).toEqual('/services/search-by-postcode');
  });
});

describe('POST /service-choose-action', () => {
  test('invalid chooseAction redirects to /service-choose-action', async function () {
    const res = await request(app).post('/service-choose-action').send({ chooseAction: 'foobar' });
    expect(res.statusCode).toEqual(302);
    expect(res.get('location')).toEqual('/service-choose-action');
  });
  test('chooseAction=nearest redirects to /services/nearest', async function () {
    const res = await request(app).post('/service-choose-action').send({ chooseAction: 'nearest' });
    expect(res.statusCode).toEqual(302);
    expect(res.get('location')).toEqual('/services/nearest');
  });
  test('chooseAction=documents> redirects to /services/documents', async function () {
    const res = await request(app).post('/service-choose-action').send({ chooseAction: 'documents' });
    expect(res.statusCode).toEqual(302);
    expect(res.get('location')).toEqual('/services/documents');
  });
  test('chooseAction=update redirects to /services/update', async function () {
    const res = await request(app).post('/service-choose-action').send({ chooseAction: 'update' });
    expect(res.statusCode).toEqual(302);
    expect(res.get('location')).toEqual('/services/update');
  });
  test('chooseAction=not-listed> redirects to /services/not-listed', async function () {
    const res = await request(app).post('/service-choose-action').send({ chooseAction: 'not-listed' });
    expect(res.statusCode).toEqual(302);
    expect(res.get('location')).toEqual('/services/not-listed');
  });
});
