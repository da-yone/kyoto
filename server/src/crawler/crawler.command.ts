import { CrawlerService } from './crawler.service'
import { Injectable } from '@nestjs/common'
import { Command, CommandRunner } from 'nest-commander'

@Injectable()
@Command({ name: 'crawl' })
export class CrawlerCommand extends CommandRunner {
  constructor(private readonly crawler: CrawlerService) {
    super()
  }

  async run(): Promise<void> {
    await this.crawler.suumo()
  }
}

@Injectable()
@Command({ name: 'deep_crawl' })
export class DeepClawlerCommand extends CommandRunner {
  constructor(private readonly crawler: CrawlerService) {
    super()
  }

  async run(): Promise<void> {
    await this.crawler.deep_suumo()
  }
}
