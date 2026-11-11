"""Clasifica los ejercicios por tipo a partir del texto del enunciado.
Uso: python3 classify.py items.json overrides.json > classified.json"""
import json, re, sys, unicodedata

def norm(t):
    t = unicodedata.normalize('NFD', t.lower())
    return ''.join(c for c in t if unicodedata.category(c) != 'Mn')

R = {
 'mat2': {
  'sistemas': [(r'sistema', 2), (r'discut', 2), (r'rouche', 3), (r'incognita', 1), (r'compatible', 2), (r'ecuaciones', 1), (r'calcule el numero de|cuantos? .* (compr|vend|fabric)|precio de cada', 2)],
  'matrices': [(r'\bmatri(z|ces)\b', 2), (r'determinante', 2), (r'\brango\b', 2), (r'inversa', 2), (r'\ba\s*\^?\s*-1|a−1', 1), (r'potencia|a\s*\^\s*n|\ba n\b', 1), (r'ecuacion matricial', 3), (r'traspuesta', 1)],
  'limites': [(r'limite|\blim\b|lı́m|lım', 2), (r'continu', 2), (r'asintota', 3), (r'derivable', 1), (r'discontinu', 2)],
  'teoremas': [(r'bolzano', 4), (r'rolle', 4), (r'valor medio', 4), (r'teorema', 2), (r'(al menos|exactamente|una unica|solo una) (una )?(solucion|raiz)', 3), (r'corta(n)? (al eje|en un unico)', 1)],
  'derivadas': [(r'deriv', 2), (r'tangente', 3), (r'extremos?\b|maximos?|minimos?', 1), (r'crecimiento|decrecimiento|creciente|decreciente|monoton', 2), (r'inflexion|concav|convex|curvatura', 2), (r'represent', 1), (r'f\s*′|f\s*\'', 1)],
  'optimizacion': [(r'optim', 3), (r'(dimensiones|que sea maxim|que sea minim|maximice|minimice|para que el (area|volumen|coste|beneficio))', 3), (r'(area|volumen|coste|beneficio|perimetro|superficie) (maxim|minim)', 3), (r'metros|euros|cm', 1)],
  'integrales': [(r'integral|primitiva|∫|barrow', 3), (r'\barea\b.*(curva|recinto|region|limitad|encerrad|grafica)|recinto|region acotada', 3), (r'\barea\b', 1)],
  'rectasplanos': [(r'\brecta', 2), (r'\bplanos?\b', 2), (r'posicion relativa|se cortan|se cruzan|paralel|coplanari|contien', 2), (r'π|≡', 1)],
  'metrica': [(r'distancia', 3), (r'angulo', 3), (r'simetric', 3), (r'proyeccion', 3), (r'volumen|tetraedro|paralelepipedo', 2), (r'area del (triangulo|paralelogramo)|triangulo|paralelogramo|cuadrado', 2), (r'perpendicular comun|equidist', 2)],
  'probabilidad': [(r'probabilidad', 2), (r'suceso', 2), (r'al azar|se elige|se extrae|se lanza|urna|dado', 1), (r'bayes|condicionad', 2), (r'p\s*\(', 1)],
  'distribuciones': [(r'distribucion normal|\bnormal\b', 3), (r'binomial', 3), (r'desviacion tipica|media de', 1), (r'\bn\s*\(\s*\d|b\s*\(\s*\d+\s*[,;]', 2), (r'variable aleatoria', 2)],
 },
 'matccss': {
  'matrices': [(r'\bmatri(z|ces)\b', 2), (r'inversa', 2), (r'determinante|rango', 1), (r'ecuacion matricial|a\s*·\s*x|x\s*·\s*a|ax\s*=|xa\s*=', 3), (r'potencia|a\s*\^\s*n', 1), (r'traspuesta', 1)],
  'sistemas': [(r'sistema', 3), (r'discut|compatible|incognita', 2), (r'cuantos? (kilos|kg|unidades|euros|entradas|personas|alumnos)|precio de cada|planteese|plantee un sistema', 2)],
  'pl': [(r'region|restricciones|funcion objetivo|programacion lineal|vertices|factible', 3), (r'≤|≥', 1), (r'maximiz|minimiz', 1)],
  'funciones': [(r'continu|derivable|asintota|limite|\blim\b|lı́m|lım', 2), (r'deriv|tangente|extremo|maximo|minimo|crecimiento|decrecimiento|creciente|decreciente|monoton|inflexion|concav|convex', 2), (r'funcion', 1), (r'beneficio|coste|ingreso', 1)],
  'integrales': [(r'integral|primitiva|∫|barrow', 3), (r'\barea\b', 2), (r'recinto|region acotada|limitad', 1)],
  'probabilidad': [(r'probabilidad', 2), (r'suceso', 2), (r'al azar|se elige|se selecciona|urna|dado', 1), (r'bayes|condicionad|sabiendo que|si se sabe', 2), (r'p\s*\(', 1)],
  'inferencia': [(r'intervalo de confianza|nivel de confianza|confianza', 4), (r'muestra|muestral|tamano', 2), (r'error maximo|error de estimacion|margen de error', 3), (r'poblacional|proporcion', 1), (r'media muestral', 3)],
 },
 'eco': {
  'p-productividad': [(r'productividad', 3), (r'horas|trabajadores|unidades producidas|empleados', 1), (r'tasa de variacion|variacion porcentual', 1)],
  'p-costes': [(r'umbral|punto muerto|punto de equilibrio|break', 4), (r'costes? fijos?|costes? variables?|coste unitario', 2), (r'fabricar|comprar', 1), (r'beneficio', 1)],
  'p-inversion': [(r'\bvan\b|valor actual neto', 4), (r'\btir\b|tasa interna', 4), (r'pay ?-?back|plazo de recuperacion', 4), (r'flujos? (netos? )?de caja|desembolso inicial|proyectos? de inversion', 2)],
  'p-balance': [(r'balance', 3), (r'fondo de (maniobra|rotacion)', 3), (r'ratio', 2), (r'activo|pasivo|patrimonio neto', 1), (r'situacion patrimonial|masas patrimoniales', 2)],
  'p-resultados': [(r'(cuenta de )?perdidas y ganancias|resultado del ejercicio|resultado de explotacion', 3), (r'rentabilidad (economica|financiera)', 3), (r'\bbaii\b|\bbai\b|beneficio neto', 2)],
  'p-pmm': [(r'maduracion', 4), (r'rotacion de|periodo medio', 2)],
  'p-inventarios': [(r'\bfifo\b|\bpmp\b|precio medio ponderado', 4), (r'existencias finales|valoracion de (las )?existencias|ficha de almacen', 3), (r'wilson|pedido optimo|volumen optimo', 4)],
  't-empresa': [(r'forma juridica|sociedad (anonima|limitada|laboral|colectiva|comanditaria)|cooperativa|\bs\.?\s?a\.?\b|\bs\.?\s?l\.?\b', 3), (r'empresario|autonomo|emprendedor', 2), (r'responsabilidad social|etica', 3), (r'concepto de empresa|que es una empresa|funciones de la empresa|clasifique.*empresa|titularidad|empresa publica|economia social', 2)],
  't-entorno': [(r'entorno', 3), (r'porter|cinco fuerzas|fuerzas competitivas', 4), (r'\bdafo\b|\bfoda\b|\bswot\b|\bcame\b', 4), (r'estrategia(s)? competitiva|ventaja competitiva|liderazgo en costes|diferenciacion|segmentacion o enfoque', 3), (r'pestel|pest\b|stakeholders|grupos de interes', 2)],
  't-crecimiento': [(r'crecimiento (interno|externo|empresarial)|crecimiento', 2), (r'integracion (vertical|horizontal)|diversificacion|especializacion', 3), (r'multinacional|globalizacion|internacionaliz|deslocaliz', 3), (r'\bpymes?\b|pequenas y medianas', 3), (r'localizacion', 3), (r'fusion|absorcion|adquisicion|joint|franquicia|alianza|cooperacion', 2), (r'ansoff', 3)],
  't-modelo': [(r'modelo de negocio|canvas|lienzo|propuesta de valor', 4), (r'innovacion|i\s?\+\s?d|investigacion,? desarrollo', 3), (r'emprend|startup|lean|design thinking|prototipo|producto minimo', 3), (r'patente|propiedad industrial', 2)],
  't-organizacion': [(r'recursos humanos|reclutamiento|seleccion de personal|formacion de|contrato de trabajo|convenio', 3), (r'motivacion|maslow|herzberg|mcgregor|teoria (x|y)|liderazgo|lider', 3), (r'organigrama|estructura organizativa|departamentaliz|organizacion (formal|informal)|staff|matricial|lineal|funciones de la direccion|planificacion|control|direccion', 2), (r'taylor|fayol|mayo|tecnoestructura', 2)],
  't-marketing': [(r'marketing|mercadotecnia', 3), (r'segmentacion|segmento|publico objetivo', 3), (r'investigacion (de mercados|comercial)|fuentes (de informacion )?(primarias|secundarias)|encuesta', 3), (r'ciclo de vida|matriz bcg|boston', 3), (r'precio|producto|distribucion|promocion|publicidad|canal', 1), (r'cuota de mercado', 2)],
  't-produccion': [(r'proceso productivo|funcion de produccion|eficiencia (tecnica|economica)|produccion', 2), (r'calidad|just in time|\bjit\b|aprovisionamiento|inventario|stock|existencias', 2), (r'costes? (directos|indirectos|fijos|variables)', 1), (r'productividad', 1)],
  't-finanzas': [(r'financiacion|autofinanciacion|ampliacion de capital|leasing|renting|factoring|prestamo|credito|descuento de efectos|empresti', 3), (r'inversion(es)?', 2), (r'patrimonio|balance|cuentas anuales|masas patrimoniales|activo|pasivo', 2), (r'ratio|fondo de (maniobra|rotacion)|solvencia|liquidez|rentabilidad', 2), (r'amortizacion', 2)],
 },
}

def score(sid, text):
    t = norm(text)
    sc = {}
    for typ, rules in R[sid].items():
        s = 0
        for rx, w in rules:
            n = len(re.findall(rx, t))
            if n:
                s += w * min(n, 3)
        if s:
            sc[typ] = s
    return sc

def is_problem(text):
    t = norm(text)
    nums = len(re.findall(r'\d[\d.,]*\s*(€|euros|unidades|%)', t)) + len(re.findall(r'\b\d{1,3}(\.\d{3})+\b', t))
    return nums >= 3

def classify(it):
    sid, text = it['subject'], it['text']
    sc = score(sid, text)
    if sid == 'eco':
        prob = is_problem(text)
        cand = {k: v for k, v in sc.items() if k.startswith('p-' if prob else 't-')}
        if not cand:
            cand = sc
        ranked = sorted(cand.items(), key=lambda x: -x[1])
        tags = [k for k, v in ranked[:2] if v >= max(3, ranked[0][1] * 0.6)] if ranked else []
        return tags or ([ranked[0][0]] if ranked else [])
    ranked = sorted(sc.items(), key=lambda x: -x[1])
    if not ranked:
        return []
    top = ranked[0][1]
    return [k for k, v in ranked[:2] if v >= max(3, top * 0.6)]

def main():
    items = json.load(open(sys.argv[1], encoding='utf-8'))
    ov = json.load(open(sys.argv[2], encoding='utf-8')) if len(sys.argv) > 2 else {}
    for it in items:
        key = f"{it['id']}-{it['key']}"
        it['types'] = ov.get(key) or classify(it)
    json.dump(items, sys.stdout, ensure_ascii=False)

if __name__ == '__main__':
    main()
