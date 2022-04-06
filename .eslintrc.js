module.exports = {
  extends: ['@antfu'],
  rules: {
    'vue/component-tags-order': ['error', {
      order: [['script', 'template'], 'style'],
    }],
    'no-console': ['error', { allow: ['warn', 'error'] }],
  },
}
