'use stric';

window.onload = () => {
    cargarCabecero();
    cargarIngresos();
    cargarEgresos()
}

class Dato {
    constructor(descripcion, valor) {
        this._descripcion = descripcion;
        this._valor = valor;
    }
    get descripcion() {
        return this._descripcion;
    }
    set descripcion(descripcion) {
        this._descripcion = descripcion;
    }
    get valor() {
        return this._valor;
    }
    set valor(valor) {
        this._valor = valor;
    }
}

class Ingreso extends Dato {
    static contadorIngresos = 0;
    constructor(descripcion, valor) {
        super(descripcion, valor);
        this._id = ++Ingreso.contadorIngresos;
    }
    get id() {
        return this._id;
    }
}

class Egreso extends Dato {
    static contadorEgresos = 0;
    constructor(descripcion, valor) {
        super(descripcion, valor);
        this._id = ++Egreso.contadorEgresos;
    }
    get id() {
        return this._id;
    }
}

const ingresos = [
];

const egresos = [
];

const totalIngresos = () => {
    let totalIngreso = 0;
    for (let ingreso of ingresos) {
        totalIngreso += ingreso.valor;
    }
    return totalIngreso;
}
const totalEgresos = () => {
    let totalEgreso = 0;
    for (let egreso of egresos) {
        totalEgreso += egreso.valor;
    }
    return totalEgreso;
}

const cargarCabecero = () => {
    let presupuesto = totalIngresos() - totalEgresos();
    let porcentajeEgreso = totalEgresos() / totalIngresos();
    document.getElementById('presupuesto').innerHTML = moneyFormat(presupuesto);
    document.getElementById('porcentaje').innerHTML = formatoPorcentaje(porcentajeEgreso);
    document.getElementById('ingresos').innerHTML = moneyFormat(totalIngresos());
    document.getElementById('egresos').innerHTML = '-' + moneyFormat(totalEgresos());
}

const moneyFormat = valor => {
    return valor.toLocaleString('en-US', { style: 'currency', currency: 'USD', minmumFractionDigits: 2 });
}
const formatoPorcentaje = valor => {
    return valor.toLocaleString('en-US', { style: 'percent', minimumFractionDigits: 2 })
}

const cargarIngresos = () => {
    let ingresosHTML = '';
    for (let ingreso of ingresos) {
        ingresosHTML += crearIngresoHTML(ingreso);
    }
    document.getElementById('listaIngresos').innerHTML = ingresosHTML;

}

const crearIngresoHTML = (ingreso) => {
    let ingresoHTML = `
    <div class="elemento limpiarEstilos">
                    <div class="elemento_descripcion">${ingreso.descripcion}</div>
                    <div class="derecha limpiarEstilos">
                        <div class="elemento_valor">+ ${moneyFormat(ingreso.valor)}</div>
                        <div class="elemento_eliminar">
                            <button class="elemento_eliminar--btn">
                                <ion-icon name="close-circle-outline" onclick="eliminarIngreso(${ingreso.id})"></ion-icon>
                            </button>
                        </div>
                        </div>
                        </div>
                        `;

    return ingresoHTML;
}

const eliminarIngreso = id => {
    let indiiceEliminar = ingresos.findIndex(ingreso => ingreso.id === id);
    ingresos.splice(indiiceEliminar, 1);
    cargarCabecero();
    cargarIngresos();
}


const cargarEgresos = () => {
    let egresoHTML = '';
    for (let egreso of egresos) {
        egresoHTML += crearEgresoHTML(egreso);
    }
    document.getElementById('listaEgresos').innerHTML = egresoHTML;
}

const crearEgresoHTML = (egreso) => {
    let egresoHTML = `
    <div class="elemento limpiarEstilos">
    <div class="elemento_descripcion">${egreso.descripcion}</div>
    <div class="derecha limpiarEstilos">
        <div class="elemento_valor">+ ${moneyFormat(egreso.valor)}</div>
        <div class="elemento_porcentaje">${formatoPorcentaje(egreso.valor / totalEgresos())}</div>
        <div class="elemento_eliminar">
            <button class="elemento_eliminar--btn">
                <ion-icon name="close-circle-outline" onclick="eliminarEgreso(${egreso.id})"></ion-icon>
            </button>
        </div>
    </div>
</div>

    `
    return egresoHTML;
}
const eliminarEgreso = id => {
    let indiiceEliminar = egresos.findIndex(egreso => egreso.id === id);
    egresos.splice(indiiceEliminar, 1);
    cargarCabecero();
    cargarEgresos();

}

const form = document.getElementById('form')
form.addEventListener('click', (e) => {
    e.preventDefault()
})
const descripcion = document.getElementById('descripcion');
const valor = document.getElementById('valor')
const tipo = document.getElementById('tipo');

const agregaDato = document.getElementById('agregaDato').
    addEventListener('click', () => {
        if (descripcion.value !== '' && valor.value !== '') {
            if (tipo.value === 'ingreso') {
                ingresos.push(new Ingreso(descripcion.value, +valor.value));
                cargarCabecero();
                cargarIngresos();
            }
            else if (tipo.value === 'egreso') {
                egresos.push(new Egreso(descripcion.value, +valor.value));
                cargarCabecero();
                cargarEgresos();
            }
        } else {
            alert('Por favor introduce una descripcion y un valor.');
        }
    })
