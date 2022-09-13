import { ConfigModule } from '@nestjs/config'
import { CrawlerModule } from './../crawler/crawler.module'
import { SuumoCommand, NiftyCommand } from '../crawler/crawler.command'
import { Module } from '@nestjs/common'

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true }), CrawlerModule],
  providers: [SuumoCommand, NiftyCommand]
})
export class TaskModule {}
