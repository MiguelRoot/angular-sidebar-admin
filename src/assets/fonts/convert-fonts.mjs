import { fileURLToPath } from "url";
import fs from "fs";
import path from "path";
import ttf2woff2 from "ttf2woff2";

// Carpeta actual del script (src/app/assets/fonts)
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const fontsRoot = __dirname;

function convertFontsInDir(dir) {
  const items = fs.readdirSync(dir);

  items.forEach((item) => {
    const fullPath = path.join(dir, item);
    const stat = fs.statSync(fullPath);

    if (stat.isDirectory()) {
      convertFontsInDir(fullPath); // Recursivo
    } else if (item.endsWith(".ttf")) {
      const outputPath = fullPath.replace(/\.ttf$/, ".woff2");

      const input = fs.readFileSync(fullPath);
      const output = ttf2woff2(input);

      fs.writeFileSync(outputPath, output);
      console.log(`✅ Convertido: ${path.basename(outputPath)}`);

      fs.unlinkSync(fullPath); // Elimina el .ttf original
      console.log(`🗑️ Eliminado: ${path.basename(fullPath)}`);
    }
  });
}

convertFontsInDir(fontsRoot);
