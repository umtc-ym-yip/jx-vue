import hljs from 'highlight.js'
import 'highlight.js/styles/github-dark.css' // 或者你喜歡的其他主題

export default {
  mounted(el, binding) {
    const code = el.textContent.trim()
    const language = binding.arg || 'javascript' // 默認為 javascript
    const highlightedCode = hljs.highlight(code, { language }).value
    el.innerHTML = highlightedCode
    el.classList.add('hljs', language)
  }
}
