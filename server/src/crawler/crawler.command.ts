import { CrawlerService } from './crawler.service'
import { Injectable } from '@nestjs/common'
import { Command, CommandRunner } from 'nest-commander'

@Injectable()
@Command({ name: 'suumo' })
export class CrawlerCommand extends CommandRunner {
  constructor(private readonly crawler: CrawlerService) {
    super()
  }

  async run(): Promise<void> {
    await this.crawler.suumo()
  }
}
