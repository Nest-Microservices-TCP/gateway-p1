import { OnModuleInit } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';

export abstract class KafkaController implements OnModuleInit {
  constructor(protected readonly kafkaClient: ClientKafka) {}

  onModuleInit() {
    const topics = (this.constructor as any).subscribedTopics || [];
    topics.forEach((topic) => this.kafkaClient.subscribeToResponseOf(topic));
    throw new Error('Method not implemented.');
  }
}
