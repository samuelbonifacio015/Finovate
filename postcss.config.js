export default {
  plugins: {
    'postcss-nested': {},
    'postcss-preset-env': {
      stage: 2,
      features: {
        'nesting-rules': true,
        'custom-media-queries': true,
        'custom-properties': true
      }
    },
    'autoprefixer': {
      overrideBrowserslist: [
        'last 2 versions',
        '> 1%',
        'not dead'
      ]
    }
  }
}

