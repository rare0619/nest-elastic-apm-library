import { Injectable } from '@nestjs/common';
import apm from 'elastic-apm-node';
import { NestjsElasticApmLibConfigService } from '@app/nestjs-elastic-apm-lib/nestjs-elastic-apm-lib-config.service';
import { startApm } from './start';

@Injectable()
export class NestjsElasticApmLibService {
  private apm: apm.Agent;

  constructor(configService: NestjsElasticApmLibConfigService) {
    this.apm = startApm(configService);
  }

  public captureError(
    data: Error | string | apm.ParameterizedMessageObject,
    callback?: apm.CaptureErrorCallback,
  ): void {
    this.apm.captureError(data, callback);
  }

  public startTransaction(
    name?: string,
    options?: apm.TransactionOptions,
  ): apm.Transaction | null {
    return this.apm.startTransaction(name, options);
  }

  public setTransactionName(name: string): void {
    this.apm.setTransactionName(name);
  }

  public startSpan(name?: string, options?: apm.SpanOptions): apm.Span | null {
    return this.apm.startSpan(name, options);
  }

  public setCustomContext(context: Record<string, unknown>): void {
    this.apm.setCustomContext(context);
  }

  public getApmAgent() {
    return this.apm;
  }
}
