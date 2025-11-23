<script setup lang="ts">
import { computed } from 'vue'
import { marked } from 'marked'
import { Icon } from '@iconify/vue'
import { RouterLink } from 'vue-router'
import resumeMarkdown from '@/assets/张克凌-前端工程师.md?raw'

// Configure marked options for better output
marked.setOptions({
  breaks: true,
  gfm: true,
})

const resumeHtml = computed(() => marked(resumeMarkdown))

const handlePrint = () => {
  window.print()
}
</script>

<template>
  <div class="w-full animate-fade-in">
    <!-- Action Bar -->
    <div class="no-print flex items-center justify-between mb-6 gap-4">
      <RouterLink
        to="/"
        class="inline-flex items-center gap-2 px-4 py-2 bg-white text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition-all duration-200 shadow-sm hover:shadow"
      >
        <Icon icon="tabler:arrow-left" class="w-5 h-5" />
        返回首页
      </RouterLink>

      <button
        @click="handlePrint"
        class="inline-flex items-center gap-2 px-4 py-2 bg-primary-600 text-white font-medium rounded-lg hover:bg-primary-700 transition-all duration-200 shadow-sm hover:shadow"
      >
        <Icon icon="tabler:printer" class="w-5 h-5" />
        打印简历
      </button>
    </div>

    <!-- Resume Content -->
    <article class="bg-white rounded-2xl shadow-lg p-8 md:p-12 prose prose-lg max-w-none print:shadow-none print:rounded-none">
      <div
        class="markdown-content"
        v-html="resumeHtml"
      />
    </article>

    <!-- Bottom Action Bar -->
    <div class="no-print flex justify-center mt-6">
      <RouterLink
        to="/"
        class="inline-flex items-center gap-2 px-4 py-2 bg-white text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition-all duration-200 shadow-sm hover:shadow"
      >
        <Icon icon="tabler:arrow-left" class="w-5 h-5" />
        返回首页
      </RouterLink>
    </div>
  </div>
</template>

<style>
/* Prose customizations for better markdown rendering */
.markdown-content {
  @apply text-gray-800;
}

.markdown-content h1 {
  @apply text-5xl font-bold text-gray-900 mt-0 mb-6 pb-4 border-b-2 border-gray-200;
}

.markdown-content h2 {
  @apply text-3xl font-bold text-gray-900 mt-10 mb-4 flex items-center gap-2;
}

.markdown-content h2::before {
  content: '#';
  @apply text-primary-500 font-normal;
}

.markdown-content h3 {
  @apply text-2xl font-semibold text-gray-800 mt-8 mb-3 flex items-center gap-2;
}

.markdown-content h3::before {
  content: '##';
  @apply text-primary-400 font-normal text-lg;
}

.markdown-content p {
  @apply my-4 leading-relaxed;
}

.markdown-content a {
  @apply text-primary-600 hover:text-primary-700 underline decoration-primary-200 hover:decoration-primary-400 transition-colors;
}

.markdown-content ul,
.markdown-content ol {
  @apply my-4 space-y-2;
}

.markdown-content li {
  @apply ml-6;
}

.markdown-content code {
  @apply bg-gray-100 px-2 py-1 rounded text-sm font-mono text-primary-700;
}

.markdown-content pre {
  @apply bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto;
}

.markdown-content blockquote {
  @apply border-l-4 border-primary-500 pl-4 italic text-gray-600;
}

.markdown-content hr {
  @apply my-8 border-gray-200;
}

.markdown-content table {
  @apply w-full border-collapse;
}

.markdown-content th,
.markdown-content td {
  @apply border border-gray-300 px-4 py-2;
}

.markdown-content th {
  @apply bg-gray-100 font-semibold;
}

.markdown-content del {
  @apply text-gray-400;
}

.markdown-content strong {
  @apply font-semibold text-gray-900;
}

.markdown-content em {
  @apply italic;
}

/* Print styles */
@media print {
  .markdown-content {
    @apply text-black;
  }

  .markdown-content h1 {
    @apply text-4xl border-b border-gray-400;
  }

  .markdown-content h2 {
    @apply text-2xl mt-6 mb-3;
  }

  .markdown-content h3 {
    @apply text-xl mt-4 mb-2;
  }

  .markdown-content a {
    @apply text-black no-underline;
  }

  .markdown-content a::after {
    content: ' (' attr(href) ')';
    @apply text-xs text-gray-600;
  }

  .markdown-content code {
    @apply bg-gray-100;
  }
}
</style>

