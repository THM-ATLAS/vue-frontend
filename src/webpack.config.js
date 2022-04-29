const { VuetifyLoaderPlugin } = require('vuetify-loader')

module.exports = {
    plugins: [
        new VuetifyLoaderPlugin({ autoImport: true }), // Enabled by default
    ],
}