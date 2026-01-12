import type { SocialLink } from '@/types/social'

/**
 * 社交链接配置
 */
export const socialLinks: SocialLink[] = [
    {
        url: 'https://github.com/zkl2333',
        icon: 'tabler:brand-github',
        label: 'GitHub',
        color: 'hover:text-gray-900 group-hover/btn:bg-white/90',
    },
    {
        url: 'https://blog.zkl2333.com',
        icon: 'tabler:notebook',
        label: 'Blog',
        color: 'hover:text-blue-600 group-hover/btn:bg-blue-50',
    },
    {
        url: 'https://twitter.com/zkl2333',
        icon: 'tabler:brand-x',
        label: 'Twitter',
        color: 'hover:text-sky-500 group-hover/btn:bg-sky-50',
    },
    {
        url: 'mailto:i@zkl2333.com',
        icon: 'tabler:mail',
        label: 'Email',
        color: 'hover:text-red-500 group-hover/btn:bg-red-50',
    },
]
