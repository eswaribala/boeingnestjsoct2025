type JwtPayload = {
    sub: string;
    preferred_username?: string;
    email?: string;
    aud?: string | string[];
    iss?: string;
    scope?: string;
    realm_access?: {
        roles: string[];
    };
    resource_access?: Record<string, {
        roles: string[];
    }>;
};
declare const JwtStrategy_base: new (...args: any) => any;
export declare class JwtStrategy extends JwtStrategy_base {
    constructor();
    validate(payload: JwtPayload): Promise<{
        userId: string;
        username: string | undefined;
        roles: string[];
        raw: JwtPayload;
    }>;
}
export {};
