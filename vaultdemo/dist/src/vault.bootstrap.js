"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.loadVaultSecrets = loadVaultSecrets;
const node_vault_1 = __importDefault(require("node-vault"));
function createVaultClient() {
    const endpoint = process.env.VAULT_ADDR || 'http://127.0.0.1:8200';
    const namespace = process.env.VAULT_NAMESPACE;
    const token = process.env.VAULT_TOKEN;
    const opts = { apiVersion: 'v1', endpoint };
    if (namespace)
        opts.namespace = namespace;
    if (token)
        opts.token = token;
    return (0, node_vault_1.default)(opts);
}
async function loginIfNeeded(vault) {
    if (vault.token)
        return;
    const roleId = process.env.VAULT_ROLE_ID;
    const secretId = process.env.VAULT_SECRET_ID;
    if (roleId && secretId) {
        const res = await vault.approleLogin({ role_id: roleId, secret_id: secretId });
        const clientToken = res?.auth?.client_token;
        if (!clientToken)
            throw new Error('AppRole login succeeded but no client_token returned');
        vault.token = clientToken;
        return;
    }
    throw new Error('No Vault auth configured: set VAULT_TOKEN or VAULT_ROLE_ID + VAULT_SECRET_ID');
}
function kvPath(mount, secretPath, kvVersion) {
    return kvVersion === 2 ? `${mount}/data/${secretPath}` : `${mount}/${secretPath}`;
}
async function loadVaultSecrets() {
    console.log('VAULT_ADDR:', process.env.VAULT_ADDR || '(default http://127.0.0.1:8200)');
    console.log('VAULT_NAMESPACE:', process.env.VAULT_NAMESPACE || '(none)');
    console.log('Auth (token | approle):', Boolean(process.env.VAULT_TOKEN), '|', Boolean(process.env.VAULT_ROLE_ID && process.env.VAULT_SECRET_ID));
    const vault = createVaultClient();
    await loginIfNeeded(vault);
    const mount = process.env.VAULT_MOUNT || 'secret';
    const secretPath = process.env.VAULT_SECRET_PATH || 'vaultdemo/config';
    const kvVersion = Number(process.env.VAULT_KV_VERSION || '2');
    const path = kvPath(mount, secretPath, kvVersion);
    const res = await vault.read(path);
    const data = kvVersion === 2 ? res?.data?.data : res?.data;
    if (!data || typeof data !== 'object') {
        throw new Error(`No data found at ${path}`);
    }
    for (const [k, v] of Object.entries(data)) {
        process.env[String(k)] = String(v);
        console.log(`  Set process.env.${k}`);
        console.log(`  Set process.env.${v}`);
    }
    console.log('Loaded keys from Vault:', Object.keys(data));
    return data;
}
//# sourceMappingURL=vault.bootstrap.js.map