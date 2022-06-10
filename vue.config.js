const {defineConfig} = require('@vue/cli-service')
module.exports = defineConfig({
    transpileDependencies: true,

    pluginOptions: {
        vuetify: {
            // https://github.com/vuetifyjs/vuetify-loader/tree/next/packages/vuetify-loader
        }
    },
    devServer: {
        port: 3000
    }
})


/*
module.exports = {
    transpileDependencies: [
        'vuetify'
    ]
}

*/

