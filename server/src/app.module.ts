import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { ApiModule } from './api/api.module'
import { CrawlerModule } from './crawler/crawler.module'
import { DbModule } from './db/db.module'
import { TaskModule } from './task/task.module'
import { ConfigModule } from '@nestjs/config'

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    ApiModule,
    CrawlerModule,
    DbModule,
    TaskModule
  ],
  controllers: [AppController],
  providers: [AppService]
})
export class AppModule {}
