import { defineConfig } from "cypress";
import localstoragePlugin from "cypress-localstorage-commands/plugin";

export default defineConfig({
  e2e: {
    baseUrl: "http://localhost:5173",
    setupNodeEvents(on, config) {
      // implement node event listeners here
      // evitar el borrado del local storage
      localstoragePlugin(on, config); // Agrega el plugin de local storage
      return config;
    },
  },

  component: {
    devServer: {
      framework: "react",
      bundler: "vite",
    },
  },
});
