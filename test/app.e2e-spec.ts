import { Test, TestingModule } from '@nestjs/testing';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';

describe('CatsController (e2e)', () => {
  let app;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('GET /cats/1 should return findOne message', () => {
    return request(app.getHttpServer())
      .get('/cats/1')
      .expect(200)
      .expect('This action returns a #1 cat');
  });
});
