import apm, {
  Agent,
  AgentConfigOptions,
  CaptureBody,
  CaptureErrorLogStackTraces,
  LogLevel,
} from 'elastic-apm-node';
import { config } from 'dotenv';
import { updateApmConfig } from './nestjs-elastic-apm-lib-config.util';

config();

const baseConfig: AgentConfigOptions = {
  serviceName: process.env.ELASTIC_APM_SERVICE_NAME || 'nestjs-apm',
  serverUrl: process.env.ELASTIC_APM_SERVER_URL,
  active: (process.env.ELASTIC_APM_ACTIVATE ?? 'true') === 'true',
  logLevel: (process.env.ELASTIC_APM_LOG_LEVEL as LogLevel) || 'info',
  environment: process.env.ELASTIC_APM_ENVIRONMENT || 'development',
  captureBody:
    (process.env.ELASTIC_APM_CAPTURE_BODY as CaptureBody | undefined) || 'off',
  captureHeaders:
    (process.env.ELASTIC_APM_CAPTURE_HEADERS ?? 'true') === 'true',
  captureErrorLogStackTraces:
    (process.env
      .ELASTIC_APM_CAPTURE_ERROR_LOG_STACK_TRACES as CaptureErrorLogStackTraces) ||
    'messages',
  disableInstrumentations:
    process.env.ELASTIC_APM_DISABLE_INSTRUMENTATIONS?.split(',') ?? [],
};

let apmAgent: Agent;

/**
 * 启动或更新 APM Agent。
 */
function startApm(config: AgentConfigOptions = baseConfig): Agent {
  if (!apm.isStarted()) {
    apmAgent = apm.start(config);
    console.log(`[APM] Agent started: ${config.serviceName}`);
  } else {
    updateApmConfig(config, apm);
    console.log('[APM] Agent config updated dynamically.');
  }
  return apm;
}

if (baseConfig.active) {
  startApm(baseConfig);
  console.log(`[APM] Auto-started agent for ${baseConfig.serviceName}`);
} else {
  console.log('[APM] Elastic APM inactive, skipping initialization.');
}

export default apm;
export { startApm, apmAgent, updateApmConfig };
