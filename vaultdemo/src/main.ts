import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { loadVaultSecrets } from './vault.bootstrap';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
    // 1) Load from .env first (so VAULT_* vars exist)
  // If you use @nestjs/config, import it inside AppModule; here we just use process.env.
  // Alternatively, load dotenv here:
  // require('dotenv').config();

  // 2) Get secrets from Vault
 try {
    await loadVaultSecrets();    // ⬅️ authenticates, then reads
    console.log('Vault secrets loaded ✅');
  } catch (e: any) {
    console.error('Failed to load Vault secrets at boot:', e?.response || e?.message || e);
    process.exit(1); // safer for prod
  }

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
