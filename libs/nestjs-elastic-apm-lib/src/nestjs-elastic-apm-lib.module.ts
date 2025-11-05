import { DynamicModule, Module } from '@nestjs/common';
import { NestjsElasticApmLibService } from './nestjs-elastic-apm-lib.service';
import { NestjsElasticApmLibConfigService } from '@app/nestjs-elastic-apm-lib/nestjs-elastic-apm-lib-config.service';
import { AgentConfigOptions } from 'elastic-apm-node';

@Module({})
export class NestjsElasticApmLibModule {
  static register(options: AgentConfigOptions = {}): DynamicModule {
    return {
      module: NestjsElasticApmLibModule,
      providers: [
        {
          provide: 'APM_OPTIONS',
          useValue: options ?? {},
        },
        NestjsElasticApmLibConfigService,
        NestjsElasticApmLibService,
      ],
      exports: [NestjsElasticApmLibService],
    };
  }
}
