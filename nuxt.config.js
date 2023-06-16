import colors from 'vuetify/es5/util/colors'

export default {
    ssr: true,
    dev: process.env.NODE_ENV === "production" ? "http://api.jayuvillage.com" : "http://localhost:8000",
    // Global page headers: https://go.nuxtjs.dev/config-head
    head: {
        titleTemplate: '%s - ' + process.env.APP_NAME,
        title: process.env.APP_NAME,
        htmlAttrs: {
            lang: 'kr'
        },
        meta: [
            { charset: 'utf-8' },
            { name: 'viewport', content: 'width=device-width, initial-scale=1, maximum-scale=1' },
            { hid: 'description', name: 'description', content: '' },
            { name: 'format-detection', content: 'telephone=no' },
            { property: 'og:image', content: 'https://dotmzh1fysixs.cloudfront.net/1007/KakaoTalk_Photo_2023-02-28-12-12-25.jpeg' },
            { property: 'og:title', content: '자유마을 - 3506개의 희망' },
            { property: 'og:description', content: '대한민국세력은 하나로 함께' },
        ],
        link: [
            { rel: 'stylesheet', href: '//cdn.jsdelivr.net/npm/xeicon@2.3.3/xeicon.min.css' },
            { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
            { rel: 'apple-touch-icon', type: 'image/x-icon', href: '/images/apple-touch-icon.png' },
            { rel: 'icon', type: 'image/x-icon', href: '/images/android-chrome-192x192.png' },
            { rel: 'icon', type: 'image/x-icon', href: '/images/android-chrome-512x512.png' },
            { rel: 'icon', type: 'image/x-icon', href: '/images/favicon-16x16.png' },
            { rel: 'icon', type: 'image/x-icon', href: '/images/favicon-32x32.png' },
        ],
        script: [
            { src: '//t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js' },
            { src: '//dapi.kakao.com/v2/maps/sdk.js?autoload=false&appkey=0b676e15765c46418fa53c1333910c0a&libraries=services' },
            { src: '//developers.kakao.com/sdk/js/kakao.min.js' },
            { src: '//ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js' },
            {
                src: "https://www.googletagmanager.com/gtag/js?id=" + process.env.GOOGLE_ANALYTICS_ID,
                async: true,
            },
            { src: "/js/analytics.js" },
        ]

    },

    // Global CSS: https://go.nuxtjs.dev/config-css
    css: [],

    // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
    plugins: [
        { src: '~/plugins/persistedState.js' },
        { src: '~/plugins/vue-infinite-loading.js' },
        { src: '~/plugins/axios.js' },
        { src: '~/plugins/vue2-touch-events.js' },
        { src: '~/plugins/swiper.js', mode: 'client' }
    ],

    // Auto import components: https://go.nuxtjs.dev/config-components
    components: true,

    // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
    buildModules: [
        // https://go.nuxtjs.dev/vuetify
        //'@nuxtjs/vuetify',
    ],
    // Modules: https://go.nuxtjs.dev/config-modules
    modules: [
        '@nuxtjs/axios',
        '@nuxtjs/auth-next',
        '@nuxtjs/proxy',
    ],
    axios: {
        credentials: true,
        proxy: true,
        debug: process.env.NODE_ENV !== 'production',
    },
    proxy: {
        '/api/': {
            target: process.env.AXIOS_BASE_URL,
            changeOrigin: true,
        },
        '/addrlink/': {
            target: process.env.ADDR_BASE_URL,
            changeOrigin: true,
        },
        '/portal/': {
            target: process.env.ASSEM_BASE_URL,
            changeOrigin: true
        },
        '/v1/': {
            target: process.env.AI_BASE_URL,
            changeOrigin: true,
        },
        '/link/': {
            target: process.env.BIZCALL_BASE_URL,
            changeOrigin: true,
        }
    },
    router: {
        middleware: ['auth']
    },
    auth: {
        redirect: {
            login: '/auth/login',
            logout: '/auth/login',
            callback: '/auth/login',
            home: '/'
        },
        strategies: {
            'laravelSanctum': {
                provider: 'laravel/sanctum',
                url: process.env.AXIOS_BASE_URL,
                endpoints: {
                    login: { url: '/api/auth/login' },
                    logout: { url: '/api/auth/logout' }
                }
            }
        }
    },

    // Vuetify module configuration: https://go.nuxtjs.dev/config-vuetify
    vuetify: {
        customVariables: ['~/assets/variables.scss'],
        theme: {
            dark: false,
            themes: {
                dark: {
                    primary: colors.blue.darken2,
                    accent: colors.grey.darken3,
                    secondary: colors.amber.darken3,
                    info: colors.teal.lighten1,
                    warning: colors.amber.base,
                    error: colors.deepOrange.accent4,
                    success: colors.green.accent3
                }
            }
        }
    },
    // Build Configuration: https://go.nuxtjs.dev/config-build
    build: {}
}
