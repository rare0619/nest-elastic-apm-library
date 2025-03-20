import { Injectable } from '@nestjs/common';
import apm from 'elastic-apm-node';
import { apmAgent } from './start';

@Injectable()
export class NestjsElasticApmLibService {
  private apm: apm.Agent;

  constructor() {
    this.apm = apmAgent;
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
}
