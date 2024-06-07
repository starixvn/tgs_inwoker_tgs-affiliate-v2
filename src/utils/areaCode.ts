const brand = process.env.BRAND
const defaultAreaCodeList = ['+852', '+68']
const brandToAreaCodeListObj = {
    'PB2': ['+63'],
    'PB': ['+63'],
    'PISO': ['+63'],
    'KING8': ['+852'],
    'TIGER': ['+852']
}
export const areaCodeList = brandToAreaCodeListObj[brand] ?? defaultAreaCodeList
export const defaultAreaCode = areaCodeList[0]
