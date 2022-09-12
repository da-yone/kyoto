import { Injectable } from '@nestjs/common'
import { DbService } from '../db/db.service'
import { extractSuumo, saveSuumo } from './crawler.suumo'

@Injectable()
export class CrawlerService {
  constructor(private readonly db: DbService) {}

  async suumo(): Promise<void> {
    const properties = await extractSuumo()
    await saveSuumo(this.db, properties)
  }
}
