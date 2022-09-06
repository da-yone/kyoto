import { Module } from '@nestjs/common'
import { DbModule } from '../db/db.module'
import { CrawlerService } from './crawler.service'

@Module({
  imports: [DbModule],
  providers: [CrawlerService],
  exports: [CrawlerService]
})
export class CrawlerModule {}
