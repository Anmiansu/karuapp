const calcularTotal = (precio) => { return Math.round(precio * 1.1) }

const formatearMonto = (monto) => { return monto.toLocaleString('es-PY', { style: 'currency', currency: 'PYG'}) }

const menu = [
    {nombre: "Lomito Arabe", precio: 35000},
    {nombre: "Pira Caldo", precio: 50000},
    {nombre: "Chipa Guasu", precio: 5000}
]

let montoFinal = 0
let indice = 1;

for (const plato of menu) {
    const monto = calcularTotal(plato.precio)
    const montoFormateado = formatearMonto(monto)
    
    console.log(`${indice}. ${plato.nombre} - Precio: ${montoFormateado}`)
    indice++
    montoFinal += monto
}

let montoFinalFormateado = formatearMonto(montoFinal)
console.log(`Monto final: ${montoFinalFormateado}`)