/// <reference types="vitest" />
/// <reference types="vite/client" />

import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import path from "path";

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react()],
    resolve: {
	alias: {
	    '@': path.resolve(__dirname, './src'),
	    '@assets': path.resolve(__dirname, './src/assets'),
	    '@components': path.resolve(__dirname, './src/components'),
	    '@models': path.resolve(__dirname, './src/models')
	}
    },
    test: {
	globals: true,
	environment: "jsdom"
    }
})
