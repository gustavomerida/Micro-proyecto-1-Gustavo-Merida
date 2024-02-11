let gamedata = {
    turno: 0,
    puntos: {},
    matrices: {},
    fichas_sacadas: []
};

let matrices = {};

document.addEventListener("DOMContentLoaded", function() {
    let storedPlayers = JSON.parse(localStorage.getItem("jugadores"));
    if (storedPlayers) {
      // Los jugadores están guardados, ocultar el div y mostrar el resto de elementos
      document.getElementById("container").style.display = "none";
      document.getElementById("header").style.display = "block";
      document.getElementById("main").style.display = "flex";
      document.getElementById("Fichadiv").style.display = "block";
      let boards= document.getElementsByClassName("boards");
      for(let i=0; i< boards.length; i++){
        boards[i].style.display = "grid";
      }
      player1 = storedPlayers.jugador1;
      drawCard(0, player1, "board");
      drawCard(0, storedPlayers.jugador2, "board-2");
      drawCard(0, storedPlayers.jugador3, "board-3");
      drawCard(0, storedPlayers.jugador4, "board-4");
      drawTable(storedPlayers);
      document.getElementById("Fichadiv").style.display = "none";
      document.getElementById("Ficha").innerHTML = "   ";
      localStorage.setItem("jugadores", JSON.stringify(storedPlayers));
      
    document.getElementById('Start').addEventListener("click", function() {
            // Código a ejecutar cuando se haga clic en el botón
            let boardSize = document.getElementById('Size').value;
            let storedPlayers = JSON.parse(localStorage.getItem("jugadores"));
            if (boardSize) {
                distribuirCartones(storedPlayers, boardSize);
                drawCard(boardSize, storedPlayers.jugador1, "board");
                drawCard(boardSize, storedPlayers.jugador2, "board-2");
                drawCard(boardSize, storedPlayers.jugador3, "board-3");
                drawCard(boardSize, storedPlayers.jugador4, "board-4");
                drawTable(storedPlayers);
                document.getElementById("Stop").style.display = "block";
                document.getElementById("barra").style.display = "none"; 
                document.getElementById("Fichadiv").style.display = "block"; 
                
                localStorage.setItem("jugadores", JSON.stringify(storedPlayers)); 
            }
        });
        
    document.getElementById('Stop').addEventListener("click", function() {
            // Código a ejecutar cuando se haga clic en el botón Reanudar
            gamedata = {
                turno: 0,
                puntos: {},
                matrices: {},
                fichas_sacadas: []
            };
            let storedPlayers = JSON.parse(localStorage.getItem("jugadores"));
            for (let jugador in storedPlayers){
                storedPlayers[jugador].puntos = 0;
            }
            document.getElementById("header").innerHTML = `<h1 id="title-game">Super Bingo</h1>
            <h2 id="turn">Turno: ${gamedata.turno}</h2>`;
            document.getElementById("Stop").style.display = "none";
            document.getElementById("barra").style.display = "block";
            document.getElementById("Fichadiv").style.display = "none";
            document.getElementById("Ficha").innerHTML = "   ";
            drawCard(boardSize, storedPlayers.jugador1, "board");
            drawCard(boardSize, storedPlayers.jugador2, "board-2");
            drawCard(boardSize, storedPlayers.jugador3, "board-3");
            drawCard(boardSize, storedPlayers.jugador4, "board-4");
            drawTable(storedPlayers);
            localStorage.setItem("jugadores", JSON.stringify(storedPlayers));
        });
      
    } else {
      // Los jugadores no están guardados, mostrar el formulario
      document.getElementById("container").style.display = "block";
      document.getElementById("header").style.display = "none";
      document.getElementById("main").style.display = "none";
      document.getElementById("Fichadiv").style.display = "none";
      document.getElementById("Ficha").innerHTML = "   ";
      let boards= document.getElementsByClassName("boards");
      for(let i=0; i< boards.length; i++){
        boards[i].style.display = "none";
      }

      document.getElementById('setupForm').addEventListener('submit', function(event) {
        event.preventDefault();
        
        // Crear objetos de jugador
        let player1 = {
          nombre: document.getElementById('player1').value,
          puntaje: 0,
          victorias: 0,
          puntos: 0,
          // Otras características del jugador
        };
        let player2 = {
          nombre: document.getElementById('player2').value,
          puntaje: 0,
          victorias: 0,
          puntos: 0,
          // Otras características del jugador
        };
        let player3 = {
            nombre: document.getElementById('player3').value,
            puntaje: 0,
            victorias: 0,
            puntos: 0,
            // Otras características del jugador
        };
        let player4 = {
            nombre: document.getElementById('player4').value,
            puntaje: 0,
            victorias: 0,
            puntos: 0,
            // Otras características del jugador
        };
        
        let Players= { jugador1: player1, jugador2: player2, jugador3: player3, jugador4: player4 }
        // Guardar los objetos de jugador en localStorage
        localStorage.setItem("jugadores", JSON.stringify({ jugador1: player1, jugador2: player2, jugador3: player3, jugador4: player4 }));
        let boardSize = document.getElementById('boardSize').value;
        document.getElementById("Stop").style.display = "block";
        document.getElementById("barra").style.display = "none";
        document.getElementById("Fichadiv").style.display = "block";

        document.getElementById('Start').addEventListener("click", function() {
            // Código a ejecutar cuando se haga clic en el botón
            let boardSize = document.getElementById('Size').value;
            Players = JSON.parse(localStorage.getItem("jugadores"));
            if (boardSize) {
                distribuirCartones(Players, boardSize);
                drawCard(boardSize, Players.jugador1, "board");
                drawCard(boardSize, Players.jugador2, "board-2");
                drawCard(boardSize, Players.jugador3, "board-3");
                drawCard(boardSize, Players.jugador4, "board-4");
                drawTable(Players);
                document.getElementById("Stop").style.display = "block";
                document.getElementById("barra").style.display = "none"; 
                document.getElementById("Fichadiv").style.display = "block";
                localStorage.setItem("jugadores", JSON.stringify(Players));
                console.log(JSON.stringify(Players));
            }
        });
               
        document.getElementById('Stop').addEventListener("click", function() {
            // Código a ejecutar cuando se haga clic en el botón Reanudar
            gamedata = {
                turno: 0,
                puntos: {},
                matrices: {},
                fichas_sacadas: []
            };
            let Players = JSON.parse(localStorage.getItem("jugadores"));
            for (let jugador in Players){
                Players[jugador].puntos = 0;
            }
            document.getElementById("header").innerHTML = `<h1 id="title-game">Super Bingo</h1>
            <h2 id="turn">Turno: ${gamedata.turno}</h2>`;
            document.getElementById("Stop").style.display = "none";
            document.getElementById("barra").style.display = "block";
            document.getElementById("Deletediv").style.display = "block";
            document.getElementById("Fichadiv").style.display = "none";
            document.getElementById("Ficha").innerHTML = "   ";
            drawCard(0, Players.jugador1, "board");
            drawCard(0, Players.jugador2, "board-2");
            drawCard(0, Players.jugador3, "board-3");
            drawCard(0, Players.jugador4, "board-4");
            drawTable(Players);
            localStorage.setItem("jugadores", JSON.stringify(Players));
        });
        distribuirCartones(Players, parseInt(boardSize));
        localStorage.setItem("jugadores", JSON.stringify(Players));
        drawCard(parseInt(boardSize), player1, "board");
        drawCard(parseInt(boardSize), Players.jugador2, "board-2");
        drawCard(parseInt(boardSize), Players.jugador3, "board-3");
        drawCard(parseInt(boardSize), Players.jugador4, "board-4");
        Players = JSON.parse(localStorage.getItem("jugadores"));
        drawTable(Players);
        
        // Mostrar los elementos necesarios para empezar el juego
        document.getElementById("container").style.display = "none";
        document.getElementById("header").style.display = "block";
        document.getElementById("main").style.display = "flex";
        document.getElementById("Fichadiv").style.display = "block";
        document.getElementById("Ficha").innerHTML = "   ";
        let boards= document.getElementsByClassName("boards");
        for(let i=0; i< boards.length; i++){
            boards[i].style.display = "grid"
        }
      });
    }
  });
  
  

function createMatrix (n){

    let matriz = [];
    let all = [];

    for (let i = 1; i <= n; i++) {
        let row = [];
        for (let i = 1; i <= n; i++) {
            let randomNumber = Math.floor(Math.random() * 50) + 1;
            if (all.includes(randomNumber)){
                while (all.includes(randomNumber)){
                    randomNumber = Math.floor(Math.random() * 50) + 1;
                }
            }
            all.push(randomNumber);
            row.push(randomNumber);  
        }
        matriz.push(row);
    }

    return matriz;
}

function drawCard (size, player, card){
    let playerr = player.nombre;
    let matriz = player.carton;
    if(!matriz || size==0){
        matriz = createMatrix(size);
    }else{
        
    }
    console.log(player);
    document.getElementById(`${card}`).innerHTML = `<div class="name">${playerr}</div>`;
    document.getElementById(`${card}`).innerHTML += `<div id="matrix${card}"></div>`;
    let matrizHTML = document.getElementById(`matrix${card}`);
    matrizHTML.style.gridTemplateColumns = `repeat(${size}, 1fr)`;
    matriz.forEach(row => row.forEach(element => matrizHTML.innerHTML += `<div class="token">${element}</div>`));
}

function drawTable(players){
    console.log("AQUII")
    for(let i = 0; i<players.length; i++){
        console.log(JSON.stringify(players[i].carton));
        if (!players[i].victorias){
                players[i].victorias = 0;
        }  
        if (!players[i].puntos || !players[i].carton){
            players[i].puntos = 0;
        } 
    }
     
        
    document.getElementById("players-table").innerHTML = `<tr>
    <td data-title="Nombre">${players.jugador1.nombre}</td>
    <td data-title=""> ${players.jugador1.victorias} </td>
    <td data-title=""> ${players.jugador1.puntos} </td>
  </tr>
  <tr>
    <td data-title="Nombre">${players.jugador2.nombre}</td>
    <td data-title="">${players.jugador2.victorias}</td>
    <td data-title="">${players.jugador2.puntos}</td>
  </tr>
  <tr>
    <td data-title="Nombre">${players.jugador3.nombre}</td>
    <td data-title="">${players.jugador3.victorias}</td>
    <td data-title="">${players.jugador3.puntos}</td>
  </tr>
  <tr>
    <td data-title="Nombre">${players.jugador4.nombre}</td>
    <td data-title="">${players.jugador4.victorias}</td>
    <td data-title="">${players.jugador4.puntos}</td>
  </tr>`
}

document.getElementById("Delete").addEventListener("click", function() {

    const confirmacion = confirm("¿Estás seguro de que deseas borrar los datos? Se perderán la información de los jugadores, incluyendo el historial de victorias.");

    // Verificar si el usuario ha confirmado
    if (confirmacion) {
        // Recargar la página si el usuario confirma
        localStorage.removeItem("jugadores");
        location.reload();
    } else {
        // No hacer nada si el usuario cancela
        console.log("Operación cancelada por el usuario.");
    }
  });

document.getElementById("GameButton").addEventListener("click", function() {
    gamedata.turno += 1;
    if (gamedata.turno<26){
        // console.log(gamedata);
    //Aumentar un turno (Son máximo 25)
    
    // console.log(gamedata.turno);
    document.getElementById("header").innerHTML = `<h1 id="title-game">Super Bingo</h1>
    <h2 id="turn">Turno: ${gamedata.turno}</h2>`;

    //Mostrar ficha (numero random del 1 al 50). No se sacan Fichas que hayan salido antes.
    let ficha = Math.floor(Math.random() * 50) + 1;
    if (gamedata.fichas_sacadas.includes(ficha)){
        while(gamedata.fichas_sacadas.includes(ficha) && gamedata.turno<50){
            ficha = Math.floor(Math.random() * 50) + 1;
        }
    }
    gamedata.fichas_sacadas.push(ficha);
    document.getElementById("Ficha").innerHTML = `${ficha}`;

    //Verificar matrices y cartones para ver si salio una ficha que algún jugador tenga en su carton.
    let tokens = document.getElementsByClassName("token");
    let tokensArray = Array.from(tokens); // Otra forma: let tokensArray = [...tokens];
    // console.log(gamedata.fichas_sacadas);
    
    // console.log(tokensArray);
    tokensArray.forEach(function(token) {
        if(gamedata.fichas_sacadas.includes(parseInt(token.textContent))){
            // console.log(token);
            token.classList.add('tachado');
            // token.style.backgroundColor = "#545454";
        }    
    });
    //calcular si se consiguió una nueva línea o cartón lleno.
    let players;
    let storedPlayers = JSON.parse(localStorage.getItem("jugadores"));
    if(storedPlayers){
        players = storedPlayers;
    }else{
        players= Players;
    }
    let bingo = []
    calcularPuntos(gamedata, players, bingo); //corregir

    if (bingo.length>0){
        let ps = {};
        for (let player in players){
            ps[player]= player.puntos;
        }
        
        finalizarPartida(ps, "Se alcanzó el límite de turnos!", players, bingo);
    }
    
    //El juego durará cómo máximo 25 turnos, pero si alguien consigue cartón lleno se termina.
    if(gamedata.turno>=25){
        let ps = {};
        for (let player in players){
            ps[player]= player.puntos;
        }
        
        finalizarPartida(ps, "Se alcanzó el límite de turnos!", players, bingo);
    }
    }else{
        let bingo = []
        calcularPuntos(gamedata, players, bingo);
        let players;
        let storedPlayers = JSON.parse(localStorage.getItem("jugadores"));
        if(storedPlayers){
            players = storedPlayers;
        }else{
            players= Players;
        }
        let ps = {};
        for (let player in players){
            ps[player]= player.puntos;
        }
        
        finalizarPartida(ps, "Se alcanzó el límite de turnos!", players, bingo);
    }
    

});


function calcularPuntos(gamedata, storedPlayers, bingo){

    let puntosLinea = 1;
    let puntosCarton = 5;
    let puntosDiagonal = 3;
    
    for (let jugador in storedPlayers) {
        let carton = storedPlayers[jugador].carton;
        console.log(storedPlayers[jugador]);
        let puntos = 0;
        // Verificar si se ha completado una línea horizoltal
        for (let i = 0; i < carton.length; i++) {
            let lineaCompleta = true;
            for (let j = 0; j < carton[i].length; j++) {
                if (!gamedata.fichas_sacadas.includes(carton[i][j])) {
                    lineaCompleta = false;
                break;
                }
            }
            if (lineaCompleta) {
                puntos += puntosLinea;
            }
        }

        // Verificar si se ha completado una línea vertical.
        for (let k = 0; k < carton.length; k++) {
            let lineaCompleta = true;
            for (let l = 0; l < carton[k].length; l++) {
                if (!gamedata.fichas_sacadas.includes(carton[l][k])) {
                    lineaCompleta = false;
                break;
                }
            }
            if (lineaCompleta) {
                puntos += puntosLinea;
            }
        }

        // Verificar si se ha completado una diagonal
        let lineaCompleta = true;

        for (let m=0; m<carton.length; m++) {
            if (!gamedata.fichas_sacadas.includes(carton[m][m])) {
                lineaCompleta = false;
                break;
            }
            
        }
        if (lineaCompleta) {
            puntos += puntosDiagonal;
            console.log("logrado1");
        }

        // Verificar si se ha completado una diagonal hacia arriba
        lineaCompleta = true;
        for (let o = carton.length -1; o >=0; o--) {
            if (!gamedata.fichas_sacadas.includes(carton[o][carton.length -1 - o])) {
                lineaCompleta = false;
                break;
            }
            
        }
        if (lineaCompleta) {
            puntos += puntosDiagonal;
            console.log("logrado2");
        }

        // Verificar si se ha completado el cartón
        let cartonCompleto = true;
        for (let i = 0; i < carton.length; i++) {
            for (let j = 0; j < carton[i].length; j++) {
                if (!gamedata.fichas_sacadas.includes(carton[i][j])) {
                cartonCompleto = false;
                break;
                }
            }
            if (!cartonCompleto) {
                break;
            }
        }
        if (cartonCompleto) {
            puntos = puntosCarton;
            bingo.push(storedPlayers[jugador].nombre);
            storedPlayers[jugador].victorias +=1;
        }
        storedPlayers[jugador].puntos = puntos;
        
  }
  
  drawTable(storedPlayers);
}

function finalizarPartida(storedPlayers, mensaje, sp, bingo){
    let players = storedPlayers;
    let playerspoints = new Object();
    let winner = "nadie";

    //Selección de ganador y mostrar resultados:
    if (bingo.length!=0){
        if (bingo.length==1){
            winner = bingo[0];
            alert(`Bingo!! ${winner}llenó su cartón.`);
        }else{
            alert(`Bingo!!`);
            for(let i=0;i<bingo.length;i++){
                alert(`${bingo[i]}llenó su cartón.`);
            }
        }
    }else{
        let sortedPlayers = Object.entries(sp).sort((a, b) => b[1].puntos - a[1].puntos);
        let highestScore = sortedPlayers[0][1].puntos;
        let winners = sortedPlayers.filter(player => player[1].puntos === highestScore).map(player => player[1]);
        if (winners.length === 1) {
            drawTable(sp);
            alert(`El ganador es ${winners[0].nombre} con ${highestScore} puntos.`);
            winners[0].victorias +=1;
        } else {
            console.log(winners);
            drawTable(sp);
            alert(`Hay un empate entre ${winners.map(winner => winner.nombre).join(" y ")} con ${highestScore} puntos.`);
            for(let i=0;i<winners.length;i++){
                winners[i].victorias+=1;
            }
        }
    }


    //Se borran los puntos.
    console.log(mensaje + ` ganó ${winner}`);
    localStorage.setItem("jugadores", JSON.stringify(sp));

    // if (!players.jugador1.victorias){
    //     players.jugador1.victorias = 0;
    // }  
    // if (!players.jugador1.puntos){
    //     players.jugador1.puntos = 0;
    // }
    
}


function distribuirCartones(list, n){
    matrices= [createMatrix(n), createMatrix(n), createMatrix(n), createMatrix(n)];
    list.jugador1.carton = matrices[0];
    list.jugador2.carton = matrices[1];
    list.jugador3.carton = matrices[2];
    list.jugador4.carton = matrices[3];
}