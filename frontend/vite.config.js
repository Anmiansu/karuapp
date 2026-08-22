import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// Vite: el "cocinero" que toma tu codigo JSX y lo sirve al navegador
// defineConfig + plugins: configuracion estandar de un proyecto React
export default defineConfig({
  plugins: [react()],
});
