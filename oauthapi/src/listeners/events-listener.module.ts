// src/events-listener/events-listener.module.ts
import { Module } from '@nestjs/common';
import { EventsListenerService } from './events-listener.service';  

@Module({
  providers: [EventsListenerService],
})
export class EventsListenerModule {}
