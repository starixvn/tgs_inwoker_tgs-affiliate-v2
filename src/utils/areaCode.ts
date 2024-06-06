const brand = process.env.BRAND
const defaultAreaCodeList = ['+852', '+68']
const brandToAreaCodeListObj = {
    'PB2': ['+63'],
    'PB': ['+63'],
}
export const areaCodeList = brandToAreaCodeListObj[brand] ?? defaultAreaCodeList
export const defaultAreaCode = areaCodeList[0]
