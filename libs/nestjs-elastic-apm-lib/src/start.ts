import apm from 'elastic-apm-node';
import { config } from 'dotenv';

config();
const configs: apm.AgentConfigOptions = {
  serviceName: process.env.ELASTIC_APM_SERVICE_NAME || 'noname-apm-service',
};
if (process.env.ELASTIC_APM_SERVER_URL) {
  configs['serverUrl'] = process.env.ELASTIC_APM_SERVER_URL;
}
if (process.env.ELASTIC_APM_SERVICE_NAME) {
  configs['ELASTIC_APM_ACTIVATE'] = process.env.ELASTIC_APM_ACTIVATE == 'true';
} else {
  configs['ELASTIC_APM_ACTIVATE'] = true;
}
if (process.env.ELASTIC_APM_SECRET_TOKEN) {
  configs['secretToken'] = process.env.ELASTIC_APM_SECRET_TOKEN;
}
if (process.env.ELASTIC_APM_API_KEY) {
  configs['apiKey'] = process.env.ELASTIC_APM_API_KEY;
}
if (process.env.ELASTIC_APM_SERVER_URL) {
  configs['serverUrl'] = process.env.ELASTIC_APM_SERVER_URL;
}
if (process.env.ELASTIC_APM_DISABLE_INSTRUMENTATIONS) {
  configs['disableInstrumentations'] =
    process.env.ELASTIC_APM_DISABLE_INSTRUMENTATIONS.split(',');
}

if (process.env.ELASTIC_APM_ENVIRONMENT) {
  configs['environment'] = process.env.ELASTIC_APM_ENVIRONMENT;
}

if (process.env.ELASTIC_APM_VERIFY_SERVER_CERT) {
  configs['verifyServerCert'] =
    process.env.ELASTIC_APM_VERIFY_SERVER_CERT === 'true';
}

if (process.env.ELASTIC_APM_ACTIVE) {
  configs['active'] = process.env.ELASTIC_APM_ACTIVE === 'true';
}

if (process.env.ELASTIC_APM_LOG_LEVEL) {
  if (
    process.env.ELASTIC_APM_LOG_LEVEL === 'trace' ||
    process.env.ELASTIC_APM_LOG_LEVEL === 'debug' ||
    process.env.ELASTIC_APM_LOG_LEVEL === 'info' ||
    process.env.ELASTIC_APM_LOG_LEVEL === 'warn' ||
    process.env.ELASTIC_APM_LOG_LEVEL === 'warning' ||
    process.env.ELASTIC_APM_LOG_LEVEL === 'error' ||
    process.env.ELASTIC_APM_LOG_LEVEL === 'fatal' ||
    process.env.ELASTIC_APM_LOG_LEVEL === 'critical' ||
    process.env.ELASTIC_APM_LOG_LEVEL === 'off'
  )
    configs['logLevel'] = process.env.ELASTIC_APM_LOG_LEVEL;
}

if (process.env.ELASTIC_APM_CAPTURE_BODY) {
  if (
    process.env.ELASTIC_APM_CAPTURE_BODY === 'all' ||
    process.env.ELASTIC_APM_CAPTURE_BODY === 'off' ||
    process.env.ELASTIC_APM_CAPTURE_BODY === 'transactions' ||
    process.env.ELASTIC_APM_CAPTURE_BODY === 'errors'
  )
    configs['captureBody'] = process.env.ELASTIC_APM_CAPTURE_BODY;
}

if (process.env.ELASTIC_APM_CAPTURE_HEADERS) {
  configs['ELASTIC_APM_CAPTURE_HEADERS'] =
    process.env.ELASTIC_APM_CAPTURE_HEADERS == 'true';
} else {
  configs['ELASTIC_APM_CAPTURE_HEADERS'] = true;
}

if (process.env.ELASTIC_APM_CAPTURE_ERROR_LOG_STACK_TRACES) {
  if (
    process.env.ELASTIC_APM_CAPTURE_ERROR_LOG_STACK_TRACES === 'never' ||
    process.env.ELASTIC_APM_CAPTURE_ERROR_LOG_STACK_TRACES === 'messages' ||
    process.env.ELASTIC_APM_CAPTURE_ERROR_LOG_STACK_TRACES === 'always'
  )
    configs['captureErrorLogStackTraces'] =
      process.env.ELASTIC_APM_CAPTURE_ERROR_LOG_STACK_TRACES;
}
if (process.env.ELASTIC_APM_USE_PATH_AS_TRANSACTION_NAME) {
  configs['usePathAsTransactionName'] =
    process.env.ELASTIC_APM_USE_PATH_AS_TRANSACTION_NAME === 'true';
}

const apmAgent: apm.Agent = apm.start(configs);
export { apmAgent };
