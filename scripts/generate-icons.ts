import sharp from 'sharp'
import https from 'https'
import fs from 'fs'
import path from 'path'
import { execSync } from 'child_process'
import { GRAVATAR_MIRRORS, getHash } from '../src/utils/gravatar.js'

// ========================================
// 个人信息配置（统一管理，避免硬编码）
// ========================================
const PERSONAL_INFO = {
  email: 'i@zkl2333.com',
  name: '多吃点',
  username: 'zkl2333',
  tagline: '一个热爱生活的可爱男孩',
  bio: {
    line1: '写写前端、折腾点代码，也会做些小工具玩玩'
  },
}

// 图标尺寸配置
const ICON_SIZES = {
  favicon: [16, 32, 48], // 标准 favicon 尺寸
  appleTouchIcon: 180, // iOS/Apple 图标
  pwaIcon: [192, 512], // PWA/Android 图标
  ogImage: { width: 1200, height: 630 }, // Open Graph 图片
}

/**
 * 检测系统是否已安装 CJK 中文字体。
 * 如未安装，输出警告提示（不在脚本中执行系统安装，遵循职责分离原则）。
 */
function checkCjkFontsForOgImage(): boolean {
  if (process.platform !== 'linux') return true

  const has = (cmd: string) => {
    try {
      execSync(cmd, { stdio: 'ignore' })
      return true
    } catch {
      return false
    }
  }

  const hasFcList = has('command -v fc-list')

  const hasNotoCjk = (() => {
    if (!hasFcList) return false
    try {
      const out = execSync('fc-list : family', { encoding: 'utf8' })
      return /Noto\s+Sans\s+CJK|Noto\s+Sans\s+SC|Source\s+Han\s+Sans/i.test(out)
    } catch {
      return false
    }
  })()

  if (hasNotoCjk) {
    console.log('✅ 已检测到中文字体')
    return true
  }

  console.warn('⚠️  警告：系统缺少中文字体，OG 图片中文可能显示为方块')
  console.warn('👉  CI 环境：请在 workflow 中添加 "sudo apt-get install -y fontconfig fonts-noto-cjk"')
  console.warn('👉  本地环境：请手动运行 "sudo apt-get install -y fontconfig fonts-noto-cjk"')
  return false
}

/**
 * 生成 OG 图片 SVG（液态网格 + 毛玻璃风格，匹配网页设计）
 */
function generateOgImageSvg(avatarBase64: string): string {
  const { name, username, tagline, bio } = PERSONAL_INFO

  const fontStack = "'Noto Sans SC','Noto Sans CJK SC','Source Han Sans SC','PingFang SC','Microsoft YaHei',system-ui,-apple-system,sans-serif" // rely on system fonts (CI will install)

  return `
<svg width="1200" height="630" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <!-- 噪点纹理 -->
    <filter id="noise">
      <feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="3" stitchTiles="stitch"/>
      <feColorMatrix type="saturate" values="0"/>
    </filter>

    <!-- 模糊效果（模拟毛玻璃） -->
    <filter id="blur">
      <feGaussianBlur stdDeviation="8"/>
    </filter>

    <!-- 渐变定义 - 匹配网页的液态网格颜色 -->
    <radialGradient id="blob1">
      <stop offset="0%" style="stop-color:#c084fc;stop-opacity:0.7" />
      <stop offset="100%" style="stop-color:#c084fc;stop-opacity:0" />
    </radialGradient>
    <radialGradient id="blob2">
      <stop offset="0%" style="stop-color:#818cf8;stop-opacity:0.7" />
      <stop offset="100%" style="stop-color:#818cf8;stop-opacity:0" />
    </radialGradient>
    <radialGradient id="blob3">
      <stop offset="0%" style="stop-color:#22d3ee;stop-opacity:0.7" />
      <stop offset="100%" style="stop-color:#22d3ee;stop-opacity:0" />
    </radialGradient>
    <radialGradient id="blob4">
      <stop offset="0%" style="stop-color:#e879f9;stop-opacity:0.7" />
      <stop offset="100%" style="stop-color:#e879f9;stop-opacity:0" />
    </radialGradient>

    <!-- 头像圆形裁剪 -->
    <clipPath id="avatarClip">
      <circle cx="220" cy="315" r="80"/>
    </clipPath>
  </defs>

  <!-- 背景色 -->
  <rect width="1200" height="630" fill="#F0F2F5"/>

  <!-- 液态网格背景 - 彩色渐变球 -->
  <ellipse cx="250" cy="180" rx="320" ry="320" fill="url(#blob1)" filter="url(#blur)"/>
  <ellipse cx="950" cy="200" rx="240" ry="240" fill="url(#blob2)" filter="url(#blur)"/>
  <ellipse cx="600" cy="500" rx="320" ry="320" fill="url(#blob3)" filter="url(#blur)"/>
  <ellipse cx="150" cy="480" rx="160" ry="160" fill="url(#blob4)" filter="url(#blur)"/>

  <!-- 半透明背景层（模拟 backdrop-blur） -->
  <rect width="1200" height="630" fill="#F0F2F5" opacity="0.6"/>

  <!-- 噪点纹理层 -->
  <rect width="1200" height="630" filter="url(#noise)" opacity="0.3" style="mix-blend-mode: overlay"/>

  <!-- 毛玻璃卡片主体 -->
  <g>
    <!-- 卡片阴影 -->
    <rect x="105" y="145" width="990" height="340" rx="40" fill="rgba(0, 0, 0, 0.03)"/>

    <!-- 卡片主体（毛玻璃效果） -->
    <rect x="100" y="140" width="990" height="340" rx="40" fill="rgba(255, 255, 255, 0.4)"/>

    <!-- 卡片内部高光边框 -->
    <rect x="100" y="140" width="990" height="340" rx="40" fill="none" stroke="rgba(255, 255, 255, 0.5)" stroke-width="1.5"/>
  </g>

  <!-- 头像部分 -->
  <g>
    <!-- 头像外圈（白色毛玻璃） -->
    <circle cx="220" cy="315" r="86" fill="rgba(255, 255, 255, 0.3)"/>
    <circle cx="220" cy="315" r="86" fill="none" stroke="rgba(255, 255, 255, 0.5)" stroke-width="1.5"/>

    <!-- 头像 -->
    <image href="data:image/png;base64,${avatarBase64}" x="140" y="235" width="160" height="160" clip-path="url(#avatarClip)"/>

    <!-- 头像边框 -->
    <circle cx="220" cy="315" r="80" fill="none" stroke="rgba(102, 126, 234, 0.2)" stroke-width="3"/>

    <!-- Online 状态标签 -->
    <g transform="translate(270, 380)">
      <rect x="-35" y="-12" width="70" height="24" rx="12" fill="rgba(255, 255, 255, 0.9)"/>
      <rect x="-35" y="-12" width="70" height="24" rx="12" fill="none" stroke="rgba(255, 255, 255, 1)" stroke-width="1"/>
      <!-- 绿点 -->
      <circle cx="-20" cy="0" r="4" fill="#10b981"/>
      <text x="-8" y="4" font-family="${fontStack}" font-size="11" fill="#6b7280" font-weight="500">Online</text>
    </g>
  </g>

  <!-- 文字内容 -->
  <g>
    <!-- 主标题 "多吃点" - 使用渐变 -->
    <defs>
      <linearGradient id="titleGradient" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" style="stop-color:#1a202c;stop-opacity:1" />
        <stop offset="100%" style="stop-color:#4b5563;stop-opacity:1" />
      </linearGradient>
    </defs>
    <text x="350" y="270" font-family="${fontStack}" font-size="72" font-weight="900" fill="url(#titleGradient)" letter-spacing="-2">${name}</text>

    <!-- 副标题 "@zkl2333 · 一个热爱生活的可爱男孩" -->
    <text x="350" y="330" font-family="${fontStack}" font-size="24" fill="#6b7280" font-weight="500">
      <tspan font-weight="600">@${username}</tspan>
      <tspan fill="#9ca3af" font-size="20"> · ${tagline}</tspan>
    </text>

    <!-- 描述文字 -->
    <text x="350" y="380" font-family="${fontStack}" font-size="18" fill="#6b7280">
      <tspan x="350" dy="0">${bio.line1}</tspan>
    </text>
  </g>
</svg>
  `.trim()
}

/**
 * 下载图片（带超时控制）
 */
function downloadImage(url: string, timeout: number = 10000): Promise<Buffer> {
  return new Promise((resolve, reject) => {
    const timer = setTimeout(() => {
      req.destroy()
      reject(new Error(`Download timeout: ${url}`))
    }, timeout)

    const req = https.get(url, (response) => {
      clearTimeout(timer)

      if (response.statusCode !== 200) {
        reject(new Error(`Failed to download image: ${response.statusCode} from ${url}`))
        return
      }

      const chunks: Buffer[] = []
      response.on('data', (chunk) => chunks.push(chunk))
      response.on('end', () => resolve(Buffer.concat(chunks)))
      response.on('error', reject)
    })

    req.on('error', (err) => {
      clearTimeout(timer)
      reject(err)
    })
  })
}

/**
 * 使用竞速模式从最快的镜像下载图片
 */
async function downloadFromFastestMirror(
  email: string,
  size: number = 256,
  defaultImage: string = 'identicon'
): Promise<Buffer> {
  const hash = getHash(email)
  const urls = GRAVATAR_MIRRORS.map(mirror => `${mirror}${hash}?s=${size}&d=${defaultImage}`)

  console.log(`🏁 尝试从 ${urls.length} 个镜像下载...`)

  // 并发请求所有镜像，使用第一个成功的
  const downloadPromises = urls.map((url, index) =>
    downloadImage(url, 5000) // 5秒超时
      .then(buffer => ({ url, buffer, index }))
      .catch(error => {
        console.log(`  ❌ 镜像 ${index + 1} 失败: ${new URL(url).hostname}`)
        throw error
      })
  )

  try {
    // 使用 Promise.race 获取最快的结果
    const result = await Promise.race(downloadPromises)
    console.log(`✅ 使用镜像 ${result.index + 1}: ${new URL(result.url).hostname}`)
    return result.buffer
  } catch {
    // 如果所有镜像都失败，抛出错误
    throw new Error('所有镜像下载失败')
  }
}

/**
 * 生成所有图标
 */
async function generateIcons() {
  console.log('🎨 开始生成图标...')

  // Preflight: check CJK fonts availability
  checkCjkFontsForOgImage()

  try {
    // 1. 从最快的镜像下载 Gravatar 头像
    const imageBuffer = await downloadFromFastestMirror(PERSONAL_INFO.email, 512, 'identicon')

    // 2. 处理图片
    const image = sharp(imageBuffer)
    const metadata = await image.metadata()

    console.log(`📐 原始图片尺寸: ${metadata.width}x${metadata.height}`)

    // 3. 确保输出目录存在
    const publicDir = path.resolve(process.cwd(), 'public')
    if (!fs.existsSync(publicDir)) {
      fs.mkdirSync(publicDir, { recursive: true })
    }

    // 4. 生成 favicon.ico（使用 48x48 作为基础尺寸）
    console.log('🔄 生成 favicon.ico...')
    const faviconPath = path.join(publicDir, 'favicon.ico')
    await image
      .clone()
      .resize(48, 48, { fit: 'cover', position: 'center' })
      .toFile(faviconPath)
    console.log(`✅ favicon.ico 已生成`)

    // 5. 生成 PNG 格式的 favicon（现代浏览器推荐）
    console.log('🔄 生成 favicon.png...')
    const pngPath = path.join(publicDir, 'favicon.png')
    await image.clone().resize(256, 256, { fit: 'cover', position: 'center' }).png().toFile(pngPath)
    console.log(`✅ favicon.png 已生成`)

    // 6. 生成 Apple Touch Icon（iOS）
    console.log('🔄 生成 apple-touch-icon.png...')
    const appleTouchIconPath = path.join(publicDir, 'apple-touch-icon.png')
    await image
      .clone()
      .resize(ICON_SIZES.appleTouchIcon, ICON_SIZES.appleTouchIcon, { fit: 'cover', position: 'center' })
      .png()
      .toFile(appleTouchIconPath)
    console.log(`✅ apple-touch-icon.png (${ICON_SIZES.appleTouchIcon}x${ICON_SIZES.appleTouchIcon}) 已生成`)

    // 7. 生成 PWA/Android 图标
    for (const size of ICON_SIZES.pwaIcon) {
      console.log(`🔄 生成 icon-${size}.png...`)
      const iconPath = path.join(publicDir, `icon-${size}.png`)
      await image.clone().resize(size, size, { fit: 'cover', position: 'center' }).png().toFile(iconPath)
      console.log(`✅ icon-${size}.png (${size}x${size}) 已生成`)
    }

    // 8. 生成 Open Graph 图片（1200x630，社交媒体分享用）
    console.log('🔄 生成 og-image.png（名片样式）...')
    const ogImagePath = path.join(publicDir, 'og-image.png')

    // 将头像转换为 base64
    const avatarBuffer = await image.clone().resize(200, 200).png().toBuffer()
    const avatarBase64 = avatarBuffer.toString('base64')

    // 生成 SVG 名片
    const ogSvg = generateOgImageSvg(avatarBase64)

    // 将 SVG 转换为 PNG，并做一次体积优化
    await sharp(Buffer.from(ogSvg))
      .png({ compressionLevel: 9, palette: true })
      .toFile(ogImagePath)

    console.log(`✅ og-image.png (${ICON_SIZES.ogImage.width}x${ICON_SIZES.ogImage.height}) 已生成（名片样式）`)

    console.log('🎉 所有图标生成完成！')
  } catch (error) {
    console.error('❌ 生成图标失败:', error)
    process.exit(1)
  }
}

// 执行生成
generateIcons()
