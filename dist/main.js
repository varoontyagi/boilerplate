"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const config_1 = require("@nestjs/config");
const swagger_1 = require("@nestjs/swagger");
const swagger_2 = require("./swagger/swagger");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    const config = app.get(config_1.ConfigService);
    app.enableCors();
    swagger_1.SwaggerModule.setup('api', app, (0, swagger_2.createDocument)(app));
    await app.listen(config.get('port'));
}
try {
    bootstrap();
}
catch (error) {
    console.log('Error in main.ts', error.message);
}
//# sourceMappingURL=main.js.map