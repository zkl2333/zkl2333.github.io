import { ref, onMounted } from 'vue'
import type { Repo, ContributionRepo } from '@/types/github'

/**
 * GitHub 数据获取 composable
 */
export const useGitHubData = () => {
    const projects = ref<Repo[]>([])
    const contributions = ref<ContributionRepo[]>([])
    const loading = ref(true)
    const error = ref(false)

    /**
     * 获取项目数据
     */
    const fetchProjects = async () => {
        try {
            const res = await fetch('/data/projects.json')
            if (!res.ok) throw new Error('Failed to fetch projects.json')
            const data: Repo[] = await res.json()

            console.log('Fetched projects:', data.length)

            projects.value = data
        } catch (e) {
            console.error('Failed to fetch projects.json', e)
            error.value = true
        }
    }

    /**
     * 获取贡献数据
     */
    const fetchContributions = async () => {
        try {
            const res = await fetch('/data/contributions.json')
            if (!res.ok) throw new Error('Failed to fetch contributions.json')
            const data: ContributionRepo[] = await res.json()

            console.log('Fetched contributions:', data.length)

            contributions.value = data
        } catch (e) {
            console.error('Failed to fetch contributions.json', e)
        }
    }

    /**
     * 并行加载所有数据
     */
    const loadData = async () => {
        try {
            await Promise.all([fetchProjects(), fetchContributions()])
        } catch (e) {
            console.error('Data fetch error:', e)
            error.value = true
        } finally {
            loading.value = false
        }
    }

    onMounted(() => {
        loadData()
    })

    return {
        projects,
        contributions,
        loading,
        error,
    }
}
