import { Injectable } from '@nestjs/common'
import { DbService } from '../db/db.service'
import { extractSuumo, saveSuumo } from './crawler.suumo'
import { extractNifty, saveNifty } from './crawler.nifty'

@Injectable()
export class CrawlerService {
  constructor(private readonly db: DbService) {}

  async suumo(): Promise<void> {
    const properties = await extractSuumo()
    await saveSuumo(this.db, properties)
  }

  async nifty(): Promise<void> {
    const properties = await extractNifty()
    // await saveNifty(this.db, properties)
  }
}
