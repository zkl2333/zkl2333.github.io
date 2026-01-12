/**
 * 编程语言颜色映射
 */
export const langColors: Record<string, string> = {
    'Vue': 'bg-green-400',
    'TypeScript': 'bg-blue-400',
    'JavaScript': 'bg-yellow-400',
    'HTML': 'bg-orange-400',
    'CSS': 'bg-indigo-400',
    'Python': 'bg-blue-500',
    'Java': 'bg-red-400',
    'PHP': 'bg-purple-400',
    'Ruby': 'bg-pink-400',
    'Go': 'bg-green-400',
    'C#': 'bg-blue-400',
    'C++': 'bg-red-400',
    'C': 'bg-gray-400',
    'SQL': 'bg-indigo-400',
    'NoSQL': 'bg-orange-400',
    'Docker': 'bg-purple-400',
    'Rust': 'bg-orange-400',
    'Swift': 'bg-purple-400',
    'Kotlin': 'bg-red-400',
    'Scala': 'bg-blue-400',
    'Haskell': 'bg-green-400',
    'Erlang': 'bg-yellow-400',
    'Elixir': 'bg-indigo-400',
    'Crystal': 'bg-orange-400',
    'Shell': 'bg-gray-400',
    'PowerShell': 'bg-blue-400',
    'Batch': 'bg-gray-400',
    'Makefile': 'bg-gray-400',
    'CMake': 'bg-purple-400',
    'Bash': 'bg-green-400',
}

/**
 * 获取语言颜色类名
 */
export const getLangColor = (lang: string): string => {
    return langColors[lang] || 'bg-gray-400'
}
