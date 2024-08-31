import fontforge
import os
# comando para ejecutar fontforge -script convert.py
# Ruta a la carpeta actual (donde está el script y los archivos .ttf)
current_folder = os.path.dirname(os.path.abspath(__file__))

# Carpeta de salida dentro de la carpeta actual
output_folder = os.path.join(current_folder, "convert")

# Crea la carpeta de salida si no existe
if not os.path.exists(output_folder):
    os.makedirs(output_folder)

# Itera sobre todos los archivos en la carpeta actual
for filename in os.listdir(current_folder):
    if filename.endswith(".ttf"):
        # Ruta completa del archivo de entrada
        input_path = os.path.join(current_folder, filename)
        # Nombre de archivo de salida .woff2
        output_filename = os.path.splitext(filename)[0] + ".woff2"
        output_path = os.path.join(output_folder, output_filename)
        
        # Abre el archivo .ttf y genera el archivo .woff2
        font = fontforge.open(input_path)
        font.generate(output_path)
        print(f"Convertido: {filename} a {output_filename}")

print("Conversión completada.")
