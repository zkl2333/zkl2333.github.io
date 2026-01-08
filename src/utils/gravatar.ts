import CryptoJS from 'crypto-js'

export const GRAVATAR_MIRRORS = [
  'https://cn.cravatar.com/avatar/',
  'https://www.gravatar.com/avatar/',
  'https://weavatar.com/avatar/'
]

/**
 * 生成 Gravatar hash
 */
export function getHash(email: string): string {
  return CryptoJS.MD5(email.trim().toLowerCase()).toString()
}

/**
 * 生成单个 Gravatar 头像 URL
 * @param email 邮箱地址
 * @param size 头像尺寸，默认 128
 * @param defaultImage 默认头像类型
 * @returns Gravatar 头像 URL
 */
export function getGravatarUrl(
  email: string,
  size: number = 128,
  defaultImage: string = 'identicon'
): string {
  const hash = getHash(email)
  // 默认返回国内镜像，保证基础可用性
  return `${GRAVATAR_MIRRORS[0]}${hash}?s=${size}&d=${defaultImage}`
}

/**
 * 异步获取最快响应的 Gravatar 头像 URL (竞速模式)
 * @param email 邮箱地址
 * @param size 头像尺寸
 * @param defaultImage 默认头像类型
 * @returns 最快加载成功的图片 URL
 */
export function getFastestGravatar(
  email: string,
  size: number = 128,
  defaultImage: string = 'identicon'
): Promise<string> {
  const hash = getHash(email)
  
  const checks = GRAVATAR_MIRRORS.map(mirror => {
    const url = `${mirror}${hash}?s=${size}&d=${defaultImage}`
    return new Promise<string>((resolve, reject) => {
      const img = new Image()
      img.onload = () => resolve(url)
      img.onerror = () => reject(url)
      img.src = url
    })
  })

  // 简单的 Promise.any 替代实现，兼容性更好
  return new Promise<string>((resolve) => {
    let failCount = 0
    const total = checks.length
    
    checks.forEach(p => {
      p.then(resolve).catch(() => {
        failCount++
        // 如果所有节点都失败，返回默认镜像
        if (failCount === total) {
          resolve(`${GRAVATAR_MIRRORS[0]}${hash}?s=${size}&d=${defaultImage}`)
        }
      })
    })
  })
}

