import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "ol/Map": path.resolve(__dirname, "node_modules/ol/Map.js"),
      "ol/View": path.resolve(__dirname, "node_modules/ol/View.js"),
      "ol/layer/Tile": path.resolve(__dirname, "node_modules/ol/layer/Tile.js"),
      "ol/source/OSM": path.resolve(__dirname, "node_modules/ol/source/OSM.js"),
      "ol/proj": path.resolve(__dirname, "node_modules/ol/proj.js"),
      "@assets": path.resolve(__dirname, "src/assets"),
      "@apollo/client": path.resolve(__dirname, "node_modules/@apollo/client"),
      "react-redux": path.resolve(__dirname, "node_modules/react-redux"),
      "@rematch/core": path.resolve(__dirname, "node_modules/@rematch/core"),
      "@rematch/loading": path.resolve(
        __dirname,
        "node_modules/@rematch/loading"
      ),
      "react-router-dom": path.resolve(
        __dirname,
        "node_modules/react-router-dom"
      ),
      "apollo-upload-client": path.resolve(
        __dirname,
        "node_modules/apollo-upload-client"
      ),
      "socket.io-client": path.resolve(
        __dirname,
        "node_modules/socket.io-client"
      ),
      "crypto-js": path.resolve(__dirname, "node_modules/crypto-js"),
      "react-hook-form": path.resolve(
        __dirname,
        "node_modules/react-hook-form"
      ),
      "react-select": path.resolve(__dirname, "node_modules/react-select"),
      "react-modal": path.resolve(__dirname, "node_modules/react-modal"),
      "group-by": path.resolve(__dirname, "node_modules/group-by"),
      axios: path.resolve(__dirname, "node_modules/axios"),
      leaflet: path.resolve(__dirname, "node_modules/leaflet"),
      "leaflet.locatecontrol": path.resolve(
        __dirname,
        "node_modules/leaflet.locatecontrol"
      ),
      "leaflet.locatecontrol/dist/L.Control.Locate.css": path.resolve(
        __dirname,
        "leaflet.locatecontrol/dist/L.Control.Locate.css"
      ),
      "@rematch/persist": path.resolve(
        __dirname,
        "node_modules/@rematch/persist"
      ),
      "redux-persist": path.resolve(__dirname, "node_modules/redux-persist"),
      lodash: path.resolve(__dirname, "node_modules/lodash"),
      "@nextui-org/react": path.resolve(
        __dirname,
        "node_modules/@nextui-org/react"
      ),
    },
  },
  server: {
    port: 5173,
    strictPort: true,
    host: true,
    proxy: {
      "/api": "http://localhost:4000",
    },
  },
});
