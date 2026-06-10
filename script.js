let mazo = [] 
let figuras = ["C", "D", "H", "S"]
let alfabeticos = ["A", "J", "Q", "K"]
let cartas_jugador =[]
let valores_jugador = []
let puntucion_jugador = 0
let cartas_pc = [];
let puntuacion_pc = 0;

const boton_parar = document.getElementById("boton_parar");
const mesa_pc = document.getElementById("cartas_pc");

const boton_iniciar_juego = document.getElementById("boton_juego_nuevo");
const boton_pedir = document.getElementById("boton_pedir_carta")
const mesa_jugador = document.getElementById("cartas_jugador")

const suma = (cartas) => {

    let total = 0;
    let ases = 0;

    cartas.forEach(carta => {

        let valor = carta.slice(0, -1);

        if (!isNaN(valor)) {

            total += parseInt(valor);

        } else if (valor === "A") {

            ases++;

        } else {

            total += 10;
        }
    });

    while (ases > 0) {

        if (total + 11 <= 21) {
            total += 11;
        } else {
            total += 1;
        }

        ases--;
    }

    return total;
}
const crear_mazo = ()=>{
    mazo = []
    for (let figura of figuras) {
        for(let valor=2; valor<=10; valor++){
            mazo.push(`${valor}${figura}`)
            //console.log(`${valor}${figura}`)
        }
    }
    for (let figura of figuras) {
        for(let alfabetico of alfabeticos){
            mazo.push(`${alfabetico}${figura}`)
        }
    }
    console.log(_.shuffle(mazo))
    mazo = _.shuffle(mazo)
    valores_jugador.map((carta_mesa)=>{
     const carta_eliminar = document.getElementById(carta_mesa)
     console.log(carta_mesa)
     carta_eliminar.remove()
    })
    cartas_jugador =[]
    valores_jugador = []
    //mesa_jugador.remove();
    return mazo
}

const pedir_carta = () => {

    const carta = mazo.pop();

    valores_jugador.push(carta);

    dibujarCarta(carta, mesa_jugador);

    puntucion_jugador = suma(valores_jugador);

    console.log("Jugador:", puntucion_jugador);

    if (puntucion_jugador > 21) {

        alert("Te pasaste de 21");

        terminarJuego();
    }
}
const dibujarCarta = (carta, mesa) => {

    const carta_img = document.createElement("img");

    carta_img.src = `assets/cartas/${carta}.png`;
    carta_img.classList.add("carta");

    mesa.append(carta_img);
}
const turnoPC = () => {

    while (puntuacion_pc < 17) {

        const carta = mazo.pop();

        cartas_pc.push(carta);

        dibujarCarta(carta, mesa_pc);

        puntuacion_pc = suma(cartas_pc);
    }

    determinarGanador();
}
const determinarGanador = () => {

    let mensaje = "";

    if (puntucion_jugador > 21) {

        mensaje = "Gana la banca";

    } else if (puntuacion_pc > 21) {

        mensaje = "Gana el jugador";

    } else if (puntucion_jugador > puntuacion_pc) {

        mensaje = "Gana el jugador";

    } else if (puntuacion_pc > puntucion_jugador) {

        mensaje = "Gana la banca";

    } else {

        mensaje = "Empate";
    }

    alert(`
Jugador: ${puntucion_jugador}
Banca: ${puntuacion_pc}

${mensaje}
`);
}
const terminarJuego = () => {

    boton_pedir.disabled = true;
    boton_parar.disabled = true;
}
boton_parar.addEventListener("click", () => {

    boton_pedir.disabled = true;
    boton_parar.disabled = true;

    turnoPC();
});
cartas_pc = [];
valores_jugador = [];

puntucion_jugador = 0;
puntuacion_pc = 0;

mesa_jugador.innerHTML = "";
mesa_pc.innerHTML = "";

boton_pedir.disabled = false;
boton_parar.disabled = false;

boton_iniciar_juego.addEventListener("click",crear_mazo);
boton_pedir.addEventListener("click", pedir_carta);

