import { DynamicModule, Module } from '@nestjs/common';
import { NestjsElasticApmLibService } from './nestjs-elastic-apm-lib.service';

@Module({
  providers: [NestjsElasticApmLibService],
  exports: [NestjsElasticApmLibService],
})
export class NestjsElasticApmLibModule {
  static register(): DynamicModule {
    return {
      module: NestjsElasticApmLibModule,
      imports: [],
      providers: [NestjsElasticApmLibService],
      exports: [NestjsElasticApmLibService],
    };
  }
}
