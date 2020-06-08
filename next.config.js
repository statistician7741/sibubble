/* eslint-disable */
const webpack = require('webpack')
const withLess = require('@zeit/next-less')
const withImages = require('next-images')
const withCSS = require('@zeit/next-css')

// fix: prevents error when .less files are required by node
if (typeof require !== 'undefined') {
  require.extensions['.less'] = (file) => {}
}

module.exports = withCSS(withImages(withLess({
  cssModules: false,
  lessLoaderOptions: {
    javascriptEnabled: true,
  }
})))