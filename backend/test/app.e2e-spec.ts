import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import request from 'supertest';
import { App } from 'supertest/types';
import { AppModule } from './../src/app.module';
import { HttpExceptionFilter } from './../src/shared/filters/http-exception.filter';

describe('App (e2e)', () => {
  let app: INestApplication<App>;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();

    // Apply same configuration as in main.ts
    app.useGlobalPipes(
      new ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true,
        transform: true,
      }),
    );
    app.useGlobalFilters(new HttpExceptionFilter());

    await app.init();
  });

  afterEach(async () => {
    await app.close();
  });

  describe('Root', () => {
    it('/ (GET)', () => {
      return request(app.getHttpServer())
        .get('/')
        .expect(200)
        .expect('Hello World!');
    });
  });

  describe('Health Check', () => {
    it('/health (GET) - should return health status', async () => {
      const response = await request(app.getHttpServer()).get('/health');

      // Health check may return 200 (healthy) or 503 (unhealthy)
      expect([200, 503]).toContain(response.status);

      if (response.status === 200) {
        // Healthy response format
        expect(response.body).toHaveProperty('status');
        expect(response.body).toHaveProperty('info');
        expect(response.body).toHaveProperty('details');
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
        expect(response.body.info).toHaveProperty('memory_heap');
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
        expect(response.body.info).toHaveProperty('memory_rss');
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
        expect(response.body.info).toHaveProperty('storage');
      } else {
        // Unhealthy response is transformed by error filter
        expect(response.body).toHaveProperty('statusCode', 503);
        expect(response.body).toHaveProperty('timestamp');
        expect(response.body).toHaveProperty('path', '/health');
        expect(response.body).toHaveProperty('message');
      }
    });

    it('/health/ready (GET) - should return readiness status', async () => {
      const response = await request(app.getHttpServer())
        .get('/health/ready')
        .expect(200);

      expect(response.body).toHaveProperty('status');
      expect(response.body).toHaveProperty('info');
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      expect(response.body.info).toHaveProperty('memory_heap');
    });

    it('/health/live (GET) - should return liveness status', async () => {
      const response = await request(app.getHttpServer())
        .get('/health/live')
        .expect(200);

      expect(response.body).toHaveProperty('status', 'ok');
      expect(response.body).toHaveProperty('timestamp');
    });
  });

  describe('Error Handling', () => {
    it('should return 404 for non-existent routes', async () => {
      const response = await request(app.getHttpServer())
        .get('/non-existent-route')
        .expect(404);

      expect(response.body).toHaveProperty('statusCode', 404);
      expect(response.body).toHaveProperty('timestamp');
      expect(response.body).toHaveProperty('path', '/non-existent-route');
      expect(response.body).toHaveProperty('message');
    });
  });
});
