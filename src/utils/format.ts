/**
 * 格式化工具函数
 */

/**
 * 格式化数字，使用 k、M 等单位
 * @param num 数字
 * @returns 格式化后的字符串
 * @example
 * formatNumber(1500) // "1.5k"
 * formatNumber(1000) // "1k"
 * formatNumber(500) // "500"
 * formatNumber(1500000) // "1.5M"
 */
export const formatNumber = (num: number): string => {
    if (num >= 1000000) {
        return (num / 1000000).toFixed(1).replace(/\.0$/, '') + 'M'
    }
    if (num >= 1000) {
        return (num / 1000).toFixed(1).replace(/\.0$/, '') + 'k'
    }
    return num.toString()
}
