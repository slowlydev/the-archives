import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import * as helmet from "helmet";
import * as compression from "compression";
import { SwaggerModule, DocumentBuilder } from "@nestjs/swagger";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle("Slowly Adventures")
    .addServer("http://localhost:4000/api")
    .setDescription("Slowly Adventrues backend")
    .setVersion("0.1")
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup("api", app, document);

  app.setGlobalPrefix("/api");

  app.use(helmet());
  app.use(compression());
  app.enableCors();

  await app.listen(4000);
}

bootstrap();
