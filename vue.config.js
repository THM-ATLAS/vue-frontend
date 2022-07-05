const {defineConfig} = require('@vue/cli-service')
module.exports = defineConfig({
    transpileDependencies: true,

    pluginOptions: {
        vuetify: {
            // https://github.com/vuetifyjs/vuetify-loader/tree/next/packages/vuetify-loader
        }
    },
    devServer: {
        port: 3000,
        proxy: 'http://localhost:8080/'
    }
})


/*
module.exports = {
    transpileDependencies: [
        'vuetify'
    ]
}

*/

