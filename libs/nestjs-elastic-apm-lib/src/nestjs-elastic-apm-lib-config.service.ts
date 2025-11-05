import { Injectable, Inject } from '@nestjs/common';
import { config as dotenvConfig } from 'dotenv';
import { AgentConfigOptions, LogLevel } from 'elastic-apm-node';

dotenvConfig();

@Injectable()
export class NestjsElasticApmLibConfigService {
  constructor(
    @Inject('APM_OPTIONS')
    private readonly userOptions: AgentConfigOptions = {},
  ) {}

  private readonly LOG_LEVELS: LogLevel[] = [
    'trace',
    'debug',
    'info',
    'warn',
    'error',
    'fatal',
    'off',
  ];

  private readonly CAPTURE_BODY = [
    'off',
    'all',
    'errors',
    'transactions',
  ] as const;
  private readonly CAPTURE_ERROR_STACK = [
    'never',
    'messages',
    'always',
  ] as const;

  private safeEnum<T extends string>(
    val: string | undefined,
    arr: readonly T[],
  ): T | undefined {
    return arr.includes(val as T) ? (val as T) : undefined;
  }

  getConfig(): AgentConfigOptions {
    const env = process.env;

    const defaults: AgentConfigOptions = {
      serviceName: env.ELASTIC_APM_SERVICE_NAME || 'nestjs-apm',
      serverUrl: env.ELASTIC_APM_SERVER_URL,
      secretToken: env.ELASTIC_APM_SECRET_TOKEN,
      apiKey: env.ELASTIC_APM_API_KEY,
      environment: env.ELASTIC_APM_ENVIRONMENT,
      active: env.ELASTIC_APM_ACTIVE === 'true',
      logLevel: this.safeEnum(env.ELASTIC_APM_LOG_LEVEL, this.LOG_LEVELS),
      captureBody: this.safeEnum(
        env.ELASTIC_APM_CAPTURE_BODY,
        this.CAPTURE_BODY,
      ),
      captureErrorLogStackTraces: this.safeEnum(
        env.ELASTIC_APM_CAPTURE_ERROR_LOG_STACK_TRACES,
        this.CAPTURE_ERROR_STACK,
      ),
      captureHeaders: env.ELASTIC_APM_CAPTURE_HEADERS !== 'false',
      verifyServerCert: env.ELASTIC_APM_VERIFY_SERVER_CERT !== 'false',
      usePathAsTransactionName:
        env.ELASTIC_APM_USE_PATH_AS_TRANSACTION_NAME === 'true',
      disableInstrumentations:
        env.ELASTIC_APM_DISABLE_INSTRUMENTATIONS?.split(',') ?? [],
    };

    // 用户通过 register(options) 传入的配置优先级最高
    return { ...defaults, ...this.userOptions };
  }
}
