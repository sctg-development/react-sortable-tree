import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import typescript from "@rollup/plugin-typescript";
import postcss from "rollup-plugin-postcss";
import dts from "rollup-plugin-dts";

// This is required to read package.json file when
// using Native ES modules in Node.js
// https://rollupjs.org/command-line-interface/#importing-package-json
import { createRequire } from 'node:module';
const requireFile = createRequire(import.meta.url);
const packageJson = requireFile('./package.json');


export default [{
  input: "src/index.ts",
  output: [
    {
      file: packageJson.module,
      format: "esm",
      sourcemap: true
    }
  ],
  external: [/node_modules/],
  plugins: [
    resolve(),
    commonjs(),
    typescript(),
    postcss({
      extensions: ['.css'],
      modules: true, // Active les CSS modules si nécessaire
      extract: "style.css", // Extrait le CSS dans un fichier séparé
      minimize: true, // Minifie le CSS en production,
    }),
  ]
}, {
  input: 'lib/index.d.ts',
  output: [{ file: 'lib/index.d.ts', format: 'es' }],
  plugins: [dts()],
  external: [/\.css$/]
}];