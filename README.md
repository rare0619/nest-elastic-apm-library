## Environment
```bash
node: >=20

nestjs: ^11.0.1

elk:
  elasticsearch: 
    image: docker.elastic.co/elasticsearch/elasticsearch:8.9.0
  kibana:
    image: docker.elastic.co/kibana/kibana:8.9.0
  apm-server:
    docker.elastic.co/apm/apm-server:8.9.0
 
```

## Installation
```
npm install @rare0619/nest-elastic-apm-library
```
## .env
### you can find all config Env name in Official Document [Configuration options](https://www.elastic.co/guide/en/apm/agent/nodejs/current/configuration.html)
such as
```
ELASTIC_APM_SERVICE_NAME=example-apm-agent
ELASTIC_APM_SERVER_URL=http://localhost:8200
ELASTIC_APM_ACTIVATE=true
```
## Use
### In main.ts
at first line of main.ts
```typescript
import * as dotenv from 'dotenv';

dotenv.config();
import { apmAgent } from '@rare0619/nest-elastic-apm-library';

apmAgent;
/* 
* 
* your code example
* 
*/
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(process.env.PORT ?? 3000);
}

bootstrap();
```
### In AppModule
```typescript
import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { NestjsElasticApmLibModule } from '@rare0619/nest-elastic-apm-library';

@Module({
  imports: [NestjsElasticApmLibModule.register()],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
}
```

### In AppService
```typescript
import { Injectable } from '@nestjs/common';
import { NestjsElasticApmLibService } from '@rare0619/nest-elastic-apm-library';

@Injectable()
export class AppService {
  constructor(private readonly apm: NestjsElasticApmLibService) {}

  async getHello(): Promise<any> {
    try {
      const span = this.apm.startSpan('HelloWorld.get');
      const res = 'Hello World!';
      await new Promise((resolve) => setTimeout(resolve, 1000)); // delay 1 second
      span?.end();
      return res;
    } catch (e) {
      this.apm.captureError(e);
      throw e;
    }
  }
}

```

#### Power by [nestjs](https://docs.nestjs.com/)