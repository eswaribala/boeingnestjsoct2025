"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const vault_bootstrap_1 = require("./vault.bootstrap");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    try {
        await (0, vault_bootstrap_1.loadVaultSecrets)();
        console.log('Vault secrets loaded ✅');
    }
    catch (e) {
        console.error('Failed to load Vault secrets at boot:', e?.response || e?.message || e);
        process.exit(1);
    }
    await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
//# sourceMappingURL=main.js.map