import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  // Load env file based on `mode` in the current working directory.
  // Set the third parameter to '' to load all env regardless of the `VITE_` prefix.
  const env = loadEnv(mode, process.cwd(), '');

  const shopifyStore = env.VITE_SHOPIFY_STORE || env.VITE_STORE_DOMAIN;
  const shopifyToken = env.VITE_SHOPIFY_TOKEN || env.VITE_STORE_TOKEN;

  if (!shopifyStore || !shopifyToken) {
    console.warn('\n\n' + '!'.repeat(50));
    console.warn('WARNING: SHOPIFY ENVIRONMENT VARIABLES ARE MISSING!');
    console.warn('VITE_SHOPIFY_STORE:', !!shopifyStore);
    console.warn('VITE_SHOPIFY_TOKEN:', !!shopifyToken);
    console.warn('!'.repeat(50) + '\n\n');
  }

  return {
    server: {
      host: "::",
      port: 8080,
    },
    plugins: [react()],
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
      },
    },
    // Define the variables explicitly to ensure they are available in the build
    define: {
      'process.env.VITE_SHOPIFY_STORE': JSON.stringify(shopifyStore),
      'process.env.VITE_SHOPIFY_TOKEN': JSON.stringify(shopifyToken),
      'process.env.VITE_META_PIXEL_ID': JSON.stringify(env.VITE_META_PIXEL_ID || ''),
    }
  };
});
