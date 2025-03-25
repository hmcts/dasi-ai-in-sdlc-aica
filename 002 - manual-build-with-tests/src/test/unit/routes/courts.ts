import { app } from '../../../main/app';

import { SinonSpy, spy } from 'sinon';
import request from 'supertest';

describe('GET /courts/', () => {
  let spiedFunction: SinonSpy | undefined = undefined;
  beforeAll(function () {
    spiedFunction = spy(app, 'render');
  });
  afterAll(function () {
    spiedFunction?.restore();
  });
  test('/courts/ should exist', async function () {
    const res = await request(app).get('/courts/');
    expect(res.statusCode).toEqual(200);
  });
  test('should render the "search/location" view', function () {
    expect(spiedFunction?.getCall(0).args[0]).toEqual('search/location');
  });
  test('should report no results and error', function () {
    expect(spiedFunction?.getCall(0).args[1].results).toEqual([]);
    expect(spiedFunction?.getCall(0).args[1].error).toEqual({
      text: 'Enter a court name, address, town or city',
      title: 'There is a problem',
    });
  });
});

describe('GET /courts/?search=bla', () => {
  let spiedFunction: SinonSpy | undefined = undefined;
  beforeAll(function () {
    spiedFunction = spy(app, 'render');
  });
  afterAll(function () {
    spiedFunction?.restore();
  });
  test('/courts/ should exist', async function () {
    const res = await request(app).get('/courts/?search=bl');
    expect(res.statusCode).toEqual(200);
  });
  test('should render the "search/location" view', function () {
    expect(spiedFunction?.getCall(0).args[0]).toEqual('search/location');
  });
  test('should report no results and error', function () {
    expect(spiedFunction?.getCall(0).args[1].results).toEqual([]);
    expect(spiedFunction?.getCall(0).args[1].error).toEqual({
      text: 'Search must be 3 characters or more',
      title: 'There is a problem',
    });
  });
});

describe('GET /courts/?search=blackburn', () => {
  let spiedFunction: SinonSpy | undefined = undefined;
  beforeAll(function () {
    spiedFunction = spy(app, 'render');
  });
  afterAll(function () {
    spiedFunction?.restore();
  });
  test('/courts/ should exist', async function () {
    const res = await request(app).get('/courts/?search=blackburn');
    expect(res.statusCode).toEqual(200);
  });
  test('should render the "search/location" view', function () {
    expect(spiedFunction?.getCall(0).args[0]).toEqual('search/location');
  });
  test('should report results', function () {
    expect(spiedFunction?.getCall(0).args[1].results).toEqual([
      {
        displayed: true,
        name: 'Blackburn Family Court',
        region: 2,
        slug: 'blackburn-family-court',
        updated_at: '12 Feb 2021',
      },
      {
        displayed: true,
        name: "Blackburn Magistrates' Court",
        region: 2,
        slug: 'blackburn-magistrates-court',
        updated_at: '12 Feb 2021',
      },
    ]);
  });
  test('should report no errors', function () {
    expect(spiedFunction?.getCall(0).args[1].error).toEqual(undefined);
  });
});

describe('GET /courts/blackburn-family-court', () => {
  let spiedFunction: SinonSpy | undefined = undefined;
  beforeAll(function () {
    spiedFunction = spy(app, 'render');
  });
  afterAll(function () {
    spiedFunction?.restore();
  });
  test('/courts/blackburn-family-court should exist', async function () {
    const res = await request(app).get('/courts/blackburn-family-court');
    expect(res.statusCode).toEqual(200);
  });
  test('should render the "in-person-court" view', function () {
    expect(spiedFunction?.getCall(0).args[0]).toEqual('court-details/in-person-court');
  });
  test('should report something', function () {
    expect(spiedFunction?.getCall(0).args[1].results.name).toEqual('Blackburn Family Court');
  });
  test('should report no errors', function () {
    expect(spiedFunction?.getCall(0).args[1].error).toEqual(undefined);
  });
});

describe('GET /courts/some-invalid-value', () => {
  let spiedFunction: SinonSpy | undefined = undefined;
  beforeAll(function () {
    spiedFunction = spy(app, 'render');
  });
  afterAll(function () {
    spiedFunction?.restore();
  });
  test('/courts/some-invalid-value should not exist', async function () {
    const res = await request(app).get('/courts/some-invalid-value');
    expect(res.statusCode).toEqual(404);
  });
  test('should render the "not-found" view', function () {
    expect(spiedFunction?.getCall(0).args[0]).toEqual('not-found');
  });
  test('should report no errors', function () {
    expect(spiedFunction?.getCall(0).args[1].error).toEqual(undefined);
  });
});
