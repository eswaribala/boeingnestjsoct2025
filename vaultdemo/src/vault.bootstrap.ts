// vault.ts
import vaultFactory from 'node-vault';

type VaultClient = ReturnType<typeof vaultFactory>;

/** Create a Vault client. node-vault always uses v1 HTTP API; KV v2 is handled by path */
function createVaultClient(): VaultClient {
  const endpoint  = process.env.VAULT_ADDR || 'http://127.0.0.1:8200';
  const namespace = process.env.VAULT_NAMESPACE;      // optional (HCP Vault / namespaces)
  const token     = process.env.VAULT_TOKEN;          // static token OR leave empty for AppRole

  const opts: any = { apiVersion: 'v1', endpoint };   // ✅ v1 is correct for node-vault
  if (namespace) opts.namespace = namespace;
  if (token)     opts.token = token;

  return vaultFactory(opts);
}

/** If no static token, log in with AppRole and set client token */
async function loginIfNeeded(vault: VaultClient) {
  if (vault.token) return; // already authenticated via static token

  const roleId   = process.env.VAULT_ROLE_ID;
  const secretId = process.env.VAULT_SECRET_ID;       // ✅ FIX: was VAULT_TOKEN in your code

  if (roleId && secretId) {
    const res = await vault.approleLogin({ role_id: roleId, secret_id: secretId });
    const clientToken = res?.auth?.client_token;
    if (!clientToken) throw new Error('AppRole login succeeded but no client_token returned');
    vault.token = clientToken;                        // ✅ set token on the client
    return;
  }

  throw new Error('No Vault auth configured: set VAULT_TOKEN or VAULT_ROLE_ID + VAULT_SECRET_ID');
}

/** Build KV path depending on engine version */
function kvPath(mount: string, secretPath: string, kvVersion: number) {
  return kvVersion === 2 ? `${mount}/data/${secretPath}` : `${mount}/${secretPath}`;
}

/** Read secrets and export them to process.env */
export async function loadVaultSecrets() {
  // --- diagnostics ---
  console.log('VAULT_ADDR:', process.env.VAULT_ADDR || '(default http://127.0.0.1:8200)');
  console.log('VAULT_NAMESPACE:', process.env.VAULT_NAMESPACE || '(none)');
  console.log(
    'Auth (token | approle):',
    Boolean(process.env.VAULT_TOKEN),
    '|',
    Boolean(process.env.VAULT_ROLE_ID && process.env.VAULT_SECRET_ID),
  );

  const vault = createVaultClient();
  await loginIfNeeded(vault); // ensure we have a token

  // Your mount is `secret/` and engine is KV v2
  const mount      = process.env.VAULT_MOUNT || 'secret';
  const secretPath = process.env.VAULT_SECRET_PATH || 'vaultdemo/config';
  const kvVersion  = Number(process.env.VAULT_KV_VERSION || '2'); // ✅ default to v2

  const path = kvPath(mount, secretPath, kvVersion);

  // For KV v2: read from <mount>/data/<path> and unwrap `data.data`
  const res  = await vault.read(path);
  const data = kvVersion === 2 ? res?.data?.data : res?.data;

  if (!data || typeof data !== 'object') {
    throw new Error(`No data found at ${path}`);
  }

  // Optionally export into env for the rest of the app
  for (const [k, v] of Object.entries(data)) {
    process.env[String(k)] = String(v);
    console.log(`  Set process.env.${k}`); // avoid logging values
    console.log(`  Set process.env.${v}`); 
  }

  console.log('Loaded keys from Vault:', Object.keys(data));
  return data;
}
