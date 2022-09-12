import { DbService } from './../db/db.service'
import * as puppeteer from 'puppeteer'
import { getHref, getPrice, getText, waitFor } from './util'
import type { RealEstateCreateDto } from './crawler.dto'

const SUUMO_URL = process.env.SEARCH_DEFAULT_URL_SUUMO
// 先頭から何ページ分取得するか
const PAGE_LOOP_COUNT = 1
// 新着のみ取得するかどうか
const ONLY_NEW = true

// クロールメイン処理
export const extractSuumo = async (): Promise<RealEstateCreateDto[]> => {
  const browser = await puppeteer.launch()
  console.log('==========LAUNCH BROWSER==========')

  try {
    const properties = []
    const page = await browser.newPage()
    for (let i = 1; i <= PAGE_LOOP_COUNT; i++) {
      console.log(`==========CRAWLING PAGE No.${i}==========`)
      // 検索結果ページに遷移
      await page.goto(`${SUUMO_URL}&page=${i}`, { waitUntil: 'load' })
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

// 物件情報を保存
export const saveSuumo = async (db: DbService, properties: RealEstateCreateDto[]): Promise<void> => {
  let created = 0
  for (const property of properties) {
    const exists = await db.realEstate.findFirst({
      where: {
        OR: [{ name: property.name }, { url: property.url }]
      }
    })
    if (exists) continue

    await db.realEstate.create({
      data: { site: 'SUUMO', ...property }
    })
    created++
    console.log(property)
  }
  console.log(`${created}件の物件情報を追加しました`)
}

// ページ内物件取得処理
const crawlPage = async (page: puppeteer.Page): Promise<RealEstateCreateDto[]> => {
  const properties = []
  const list = await page.$$('ul.l-cassetteitem > li')
  for (const item of list) {
    if (ONLY_NEW) {
      const isNew = await isNewArrival(item)
      if (!isNew) continue
    }

    const property = await extractProperty(item)
    properties.push(property)
  }

  return properties
}

// 「新着」ラベルの有無をチェック
const isNewArrival = async (el: puppeteer.ElementHandle): Promise<boolean> => {
  const newArrival = await el.$('.cassetteitem_other-checkbox--newarrival')
  return newArrival ? true : false
}

// l-cassetteitem liから1件の物件情報を取得する
const extractProperty = async (el: puppeteer.ElementHandle): Promise<RealEstateCreateDto> => {
  // 建物共通
  const nameEl = await el.$('.cassetteitem_content-title')
  const stationEl = await el.$('.cassetteitem_detail-col2 > .cassetteitem_detail-text')
  const ageEl = await el.$('.cassetteitem_detail-col3 > div')
  const roomTypeEl = await el.$('.cassetteitem_content-label > span')
  // 部屋
  const roomEl = await el.$('.cassetteitem-item .js-cassette_link')
  const urlEl = await roomEl.$('.js-cassette_link_href')
  const rentEl = await roomEl.$('.cassetteitem_price--rent > span')
  const managementFeeEl = await roomEl.$('.cassetteitem_price--administration')
  const floorPlanEl = await roomEl.$('.cassetteitem_madori')
  const areaSizeEl = await roomEl.$('.cassetteitem_menseki')
  const depositEl = await roomEl.$('.cassetteitem_price--deposit')
  const gratuityEl = await roomEl.$('.cassetteitem_price--gratuity')

  const property: RealEstateCreateDto = {
    url: await getHref(urlEl),
    name: await getText(nameEl),
    station: await getText(stationEl),
    age: await getText(ageEl),
    roomType: await getText(roomTypeEl),
    floorPlan: await getText(floorPlanEl),
    areaSize: await getText(areaSizeEl),
    rent: await getPrice(rentEl),
    deposit: await getPrice(depositEl),
    gratuity: await getPrice(gratuityEl),
    managementFee: await getPrice(managementFeeEl)
  }

  return property
}
