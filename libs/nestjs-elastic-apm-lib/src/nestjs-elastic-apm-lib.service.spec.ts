import { Test, TestingModule } from '@nestjs/testing';
import { NestjsElasticApmLibService } from './nestjs-elastic-apm-lib.service';

describe('NestjsElasticApmLibService', () => {
  let service: NestjsElasticApmLibService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [NestjsElasticApmLibService],
    }).compile();

    service = module.get<NestjsElasticApmLibService>(
      NestjsElasticApmLibService,
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
