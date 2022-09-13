import { RealEstateCreateDto } from './crawler.dto'
import { DbService } from './../db/db.service'
import * as puppeteer from 'puppeteer'
import { waitFor } from './util'

const NIFTY_URL = process.env.SEARCH_URL_NIFTY
const NIFTY_PARAM = process.env.SEARCH_PARAM_NIFTY
// 先頭から何ページ分取得するか
const PAGE_LOOP_COUNT = 1

export const extractNifty = async (): Promise<RealEstateCreateDto[]> => {
  const browser = await puppeteer.launch()
  console.log('==========LAUNCH BROWSER==========')

  try {
    const properties = []
    const page = await browser.newPage()
    for (let i = 1; i <= PAGE_LOOP_COUNT; i++) {
      console.log(`==========CRAWLING PAGE No.${i}==========`)
      // 検索結果ページに遷移
      await page.goto(`${NIFTY_URL}${i}/${NIFTY_PARAM}`, { waitUntil: 'load' })
      // 物件情報取得処理
      properties.concat(await crawlPage(page))
      // 3秒まつ
      await waitFor(3)
    }
    return properties
  } catch (e: unknown) {
    console.log('ERROR', e)
  } finally {
    await browser.close()
    console.log('==========CLOSE BROWSER==========')
  }
}

export const saveNifty = async (db: DbService, properties: RealEstateCreateDto[]): Promise<void> => {
  console.log('saved!')
}

const crawlPage = async (page: puppeteer.Page): Promise<RealEstateCreateDto[]> => {
  return []
}
