import { ElementHandle } from 'puppeteer'

export const getText = async (element: ElementHandle): Promise<string> => {
  const text = await (await element.getProperty('textContent')).jsonValue()
  return text
}

export const getHref = async (element: ElementHandle): Promise<string> => {
  const href = await (await element.getProperty('href')).jsonValue()
  return href as string
}

export const getPrice = async (element: ElementHandle): Promise<number> => {
  const priceText = await getText(element)
  const withoutUnit = (await priceText).replace(/(円|万円)/g, '')
  // 数値でない場合は0を返却
  if (Number.isNaN(parseInt(withoutUnit))) return 0

  // 万円表記の場合は10000を掛ける
  if ((await priceText).match(/万円/)) {
    return Number(withoutUnit) * 10000
  } else {
    return Number(withoutUnit)
  }
}
