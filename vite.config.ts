/// <reference types="vitest" />
import { defineConfig } from 'vite'
import solid from 'vite-plugin-solid'
import { resolve } from 'path'

export default defineConfig({
  test: {
    environment: 'happy-dom',
    globals: true,
  },
  server: {
    port: 5174,
    host: '0.0.0.0',
  },
  preview: {
    port: 5174,
    host: '0.0.0.0',
  },
  plugins: [
    solid(),
    {
      name: 'mpa-routing-dev',
      configureServer(server) {
        server.middlewares.use((req, _res, next) => {
          if (req.url) {
            let pathname = req.url.split('?')[0].replace(/\/+$/, '')
            if (pathname === '/EnvoyTradeLanding') {
              req.url = '/index.html'
              return next()
            }
            if (pathname.startsWith('/EnvoyTradeLanding/')) {
              pathname = pathname.replace('/EnvoyTradeLanding', '')
            }
            const pages = [
              'brokers',
              'docs',
              'setup-guide',
              'contact',
              'terms',
              'privacy',
              'risk-disclosure',
              'refund'
            ]
            for (const page of pages) {
              if (pathname === `/${page}`) {
                req.url = `/${page}/index.html`
                break
              }
            }
          }
          next()
        })
      },
      configurePreviewServer(server) {
        server.middlewares.use((req, _res, next) => {
          if (req.url) {
            let pathname = req.url.split('?')[0].replace(/\/+$/, '')
            if (pathname === '/EnvoyTradeLanding') {
              req.url = '/index.html'
              return next()
            }
            if (pathname.startsWith('/EnvoyTradeLanding/')) {
              pathname = pathname.replace('/EnvoyTradeLanding', '')
            }
            const pages = [
              'brokers',
              'docs',
              'setup-guide',
              'contact',
              'terms',
              'privacy',
              'risk-disclosure',
              'refund'
            ]
            for (const page of pages) {
              if (pathname === `/${page}`) {
                req.url = `/${page}/index.html`
                break
              }
            }
          }
          next()
        })
      }
    }
  ],
  base: './',
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        brokers: resolve(__dirname, 'brokers/index.html'),
        docs: resolve(__dirname, 'docs/index.html'),
        setupGuide: resolve(__dirname, 'setup-guide/index.html'),
        contact: resolve(__dirname, 'contact/index.html'),
        terms: resolve(__dirname, 'terms/index.html'),
        privacy: resolve(__dirname, 'privacy/index.html'),
        riskDisclosure: resolve(__dirname, 'risk-disclosure/index.html'),
        refund: resolve(__dirname, 'refund/index.html'),
      },
    },
  },
})
