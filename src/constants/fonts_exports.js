import { isAndroid } from "./variables"

export const futura = {
    bold: 'Futura-Bold',
    medium: 'Futura-Medium',
    light: 'Futura-Light',
    semi: 'Futura-Demi',
    book: 'Futura-Book'
}
export const bauhaus = {
    bold: isAndroid ? 'Bh-Bold' : 'Bauhaus-Bold',
    regular: isAndroid ? 'Bh-Regular' : 'Bauhaus-Regular',
}