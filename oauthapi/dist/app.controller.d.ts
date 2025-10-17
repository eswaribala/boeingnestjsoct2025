import { AppService } from './app.service';
import { PublisherService } from './publisher.service';
export declare class AppController {
    private readonly appService;
    private readonly pub;
    constructor(appService: AppService, pub: PublisherService);
    getHello(): string;
    publish(body: {
        txId: string;
        amount: number;
        currency?: string;
    }): Promise<{
        ok: boolean;
    }>;
}
