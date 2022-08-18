import request from 'supertest';
import server from '../../index';

describe('vaccinations/vaccine-summary', () => {
  it('return status code 400 with validation error', async () => {
    const res = await request(server).get('/api/v1/vaccinations/vaccine-summary');
    console.log('res.bodyres.body', res.body);
    expect(res.statusCode).toEqual(400);
    expect(res.body.status).toBeFalsy();
  });

  it('return status code 200 with empty array of summary', async () => {
    const res = await request(server).get(
      '/api/v1/vaccinations/vaccine-summary?c=AT&dateFrom=2020-W11&dateTo=2020-W12&range=5',
    );

    expect(res.statusCode).toEqual(200);
    expect(res.body.status).toBeTruthy();
    expect(res.body.data).toEqual({ summary: [] });
  });

  it('return status code 200 with data summary', async () => {
    const res = await request(server).get(
      '/api/v1/vaccinations/vaccine-summary?c=AT&dateFrom=2022-W11&dateTo=2022-W12&range=5',
    );

    expect(res.statusCode).toEqual(200);
    expect(res.body.status).toBeTruthy();
    expect(res.body.data).toMatchObject({
      summary: [
        {
          weekStart: expect.any(String),
          weekEnd: expect.any(String),
          NumberDosesReceived: expect.any(Number),
        },
      ],
    });
  });
});
