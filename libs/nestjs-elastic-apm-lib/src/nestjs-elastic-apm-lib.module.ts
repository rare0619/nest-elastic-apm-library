import { DynamicModule, Module } from '@nestjs/common';
import { NestjsElasticApmLibService } from './nestjs-elastic-apm-lib.service';
import { NestjsElasticApmLibConfigService } from '@app/nestjs-elastic-apm-lib/nestjs-elastic-apm-lib-config.service';

export interface ApmModuleOptions {
  serviceName?: string;
  serverUrl?: string;
  secretToken?: string;
  apiKey?: string;
  active?: boolean;
  logLevel?: 'trace' | 'debug' | 'info' | 'warn' | 'error' | 'fatal' | 'off';
  environment?: string;
  captureBody?: 'off' | 'all' | 'errors' | 'transactions';
  captureHeaders?: boolean;
  captureErrorLogStackTraces?: 'never' | 'messages' | 'always';
  verifyServerCert?: boolean;
  usePathAsTransactionName?: boolean;
  disableInstrumentations?: string[];
}

@Module({})
export class NestjsElasticApmLibModule {
  static register(options?: ApmModuleOptions): DynamicModule {
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