import apm from 'elastic-apm-node';
import { NestjsElasticApmLibConfigService } from '@app/nestjs-elastic-apm-lib/nestjs-elastic-apm-lib-config.service';

let apmAgent: apm.Agent;

export function startApm(configService: NestjsElasticApmLibConfigService) {
  if (apmAgent) return apmAgent;
  const config = configService.getConfig();
  apmAgent = apm.start(config);
  return apmAgent;
}

export { apmAgent };
