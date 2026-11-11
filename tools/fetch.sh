#!/usr/bin/env bash
# Descarga los PDF oficiales de la PAU/EvAU de Madrid (UCM) de Matemáticas II,
# Matemáticas Aplicadas a las CCSS II y Economía de la Empresa / EDMN.
# Uso: tools/fetch.sh <directorio-de-trabajo>
# Genera <dir>/index.tsv (fichero, tipo, convocatoria, asignatura, url) y <dir>/pdf/NNN.pdf
set -euo pipefail
DIR=${1:-work}; mkdir -p "$DIR/pdf"; cd "$DIR"
UCM=https://www.ucm.es
INDEX="$UCM/centros-adscritos-a-la-ucm"   # página "Materias" con todas las convocatorias

curl -sL "$INDEX" -o materias.html
grep -oiE 'href="[^"]*"[^>]*>[^<]*Ejercicios de la (EvAU|PAU)[^<]*' materias.html \
  | sed -E 's/href="([^"]*)".*>(.*)/\1|\2/' \
  | sed "s#^ejercicios#$UCM/ejercicios#; s#www.ucm.es//#www.ucm.es/#; s#^http://#https://#" | sort -u > sessions.txt
echo "https://www.ucm.es/modelos-de-examen-y-criterios-generales-de-evaluacion-|MODELOS" >> sessions.txt

: > links.tsv
while IFS='|' read -r url name; do
  curl -sL "$url" -o page.html
  grep -oiE '<a [^>]*href="[^"]*"[^>]*>[^<]{0,100}' page.html | grep -iE 'matem|empresa|econom' \
    | sed -E 's/.*href="([^"]*)"[^>]*>(.*)/\1\t\2/' \
    | while IFS=$'\t' read -r h t; do printf '%s\t%s\t%s\n' "$name" "$t" "$h" >> links.tsv; done
done < sessions.txt

i=0; : > index.tsv
while IFS=$'\t' read -r ses subj href; do
  i=$((i+1))
  case "$href" in /*) u="$UCM$href";; http*) u="$href";; *) u="$UCM/$href";; esac
  u=${u// /%20}; f=$(printf 'pdf/%03d.pdf' $i)
  curl -sL "$u" -o "$f"
  printf '%s\t%s\t%s\t%s\t%s\n' "$f" "$(file -b "$f" | cut -c1-20)" "$ses" "$subj" "$u" >> index.tsv
done < links.tsv
echo "$(wc -l < index.tsv) PDF descargados"
