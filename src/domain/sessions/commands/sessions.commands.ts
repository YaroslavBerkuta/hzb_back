import { Injectable } from '@nestjs/common';
import { Command, Positional } from 'nestjs-command';
import { SessionsService } from '../services';

@Injectable()
export class SessionsCommands {
  constructor(private readonly sessionsService: SessionsService) {}
  @Command({
    command: 'sessions:stop <userId>',
    describe: 'create a user',
  })
  stopSessions(
    @Positional({
      name: 'userId',
      describe: 'userId',
      type: 'number',
    })
    userId: number,
  ) {
    console.log('Finish');
  }
}
