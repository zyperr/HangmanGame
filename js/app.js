
const body = document.querySelector('body')
const btnswitch = document.querySelector(".darkmode__button");
const sunIcon = document.querySelector('.darkmode__button .bxs-sun')
const startGame = document.querySelector('.start');
const containerHome = document.querySelector('.container');
const keyContainer = document.querySelector('.Container__keys')
const game = document.querySelector('.game__container');
const containerFinalMsg = document.querySelector('.container-final-msg');

const lettersContainer = document.querySelector(".letters");
const canvas = document.getElementById('canvas');
const correctWord = document.querySelector('.correctWord');
const loseOrWin = document.querySelector('.lose-win');


let winCount = 0;
let count = 0;

//SoundTrack gameplay 
const soundTrack = document.createElement('audio');
soundTrack.style.display ="none";
soundTrack.src = "../sounds/soundtrack.mp3";
soundTrack.volume = 0.13;
soundTrack.autoplay = true;
body.insertAdjacentElement("afterbegin",soundTrack);





//Creating hanmang 
const canvasCreator = () =>{
    let context = canvas.getContext("2d");
    context.beginPath();
    context.strokeStyle = "orange";
    context.lineWidth = 2;
    
    const drawLine = (fromX,fromY,toX,toY) =>{
        context.moveTo(fromX,fromY);
        context.lineTo(toX,toY);
        context.stroke();
    };

    const head = ()=>{
        context.beginPath();
        context.arc(70,42,20,30,Math.PI*2,true);
        context.stroke();
    };

    const body = ()=>{
        drawLine(70,64,70,80)
    };
    const leftArm = ()=>{
        drawLine(70,73,50,70);
    };
    const rightArm = () => {
        drawLine(70,73,90,70);
    };

    const leftLeg = ()=>{
        drawLine(70,80,50,110)
    }
    const rightLeg = ()=>{
        drawLine(70,80,90,110)
    };
    
    const initialDrawing = () => {

        context.clearRect(0,0,context.canvas.width,context.canvas.height);
        drawLine(10,130,130,130);

        drawLine(10,10,10,131);

        drawLine(10,10,70,10);

        drawLine(70,10,70,20);
    };

    return {initialDrawing,head,body,leftArm,rightArm,leftLeg,rightLeg};
}
const drawMan = (count)=>{
    let {head,body,leftArm,rightArm,leftLeg,rightLeg} = canvasCreator();
    switch (count) {
        case 1:
            head();
            break;
        case 2:
            body();
            break;
        case 3:
            leftArm();
            break;
        case 4:
            rightArm();
            break;
        case 5:
            leftLeg();
            break;
        case 6:
            rightLeg();
            break;
        default:
            break;
    }
}

//When game start
const GameStart = () => {
    
    let words = [
    'Adaptacion',
    'Agudo',
    'Infeccion',
    'Postura',
    'Html',
    'Algoritmo',
    'Pantorrilla',
    'Musculo',
    'JavaScript',
    'React',
    'Alimento',
    'Metalico',
    'Procesador',
    'Agua',
    'Calor',
    'Hielo',
    'Comunidad',
    'Empresa',
    'Policia',
    'Bomberos',
    'Capital',
    'Pueblo',
    'Economia',
    'Compañia',
    'Billete',
    'Cuenta',
    'Escritorio',
    'Silla',
    'Mesa',
    'Cama',
    'Dormitorio',
    'Puerta',
    'Ventana',
    'edificio',
    'contruccion',
    'apartamento',
    'elevador',
    'escalera',
    'ascensor',
    'camara',
    'revista',
    'libro',
    'arma',
    'escultura',
    'paraguas',
    'conexion',
    'llave',
    'pomo',
    'electricidad',
    'corriente',
    'prenda',
    'gafas',
    'pantalon',
    'camisa',
    'zapatilla',
    'cordones',
    'abrigo',
    'chaqueta',
    'transito',
    'trafico',
    'tren',
    'camino',
    'ruta',
    'calle',
    'carretera',
    'autopista',
    'ambulancia',
    'coche',
    'numero',
    'alfabeto',
    'simbolo',
    'computadora',
    'ingles'
    ];
    let randomWord = Math.floor(Math.random()*words.length);
    let word = words[randomWord].toLowerCase();

    //Replace every letter with a dash
    let displayItem = word.replace(/./g,'<span class="dashes">_</span>');

    lettersContainer.innerHTML = displayItem;


    const buttons = () => { 
        const allButtons = document.querySelectorAll(".Container__keys button");
        const dashes = document.querySelectorAll(".dashes");
        let charArray = word.split("");
        allButtons.forEach((button) => {
            button.addEventListener('click',()=>{
                if(charArray.includes(button.innerText)){
                    charArray.forEach((char,index)=>{
                        if(char == button.innerText){
                            dashes[index].innerText = char;
                            //Add audio when you find a letter
                            let audioCorrect = document.createElement('audio');
                            audioCorrect.style.display ="none";
                            audioCorrect.src ="../sounds/confirm_style_4_005.ogg";
                            audioCorrect.volume = 0.25;
                            audioCorrect.play(); 
                            button.style.backgroundColor = "green";
                            button.disabled = true;
                            winCount += 1;
                            if(winCount == charArray.length){
                                const resultText = document.querySelector('.final-msg');
                                setTimeout(()=>{
                                    //Add audio for victory screen
                                    const victoryAudio = document.createElement('audio');
                                    victoryAudio.style.display ="none";
                                    victoryAudio.setAttribute('type','audio/mp3');
                                    victoryAudio.setAttribute('src','../sounds/sfx-victory1.mp3');
                                    victoryAudio.volume = 0.3;
                                    victoryAudio.play()
                                    //style for final msg screen
                                    containerFinalMsg.style.background = "hsl(0deg 0% 5% / 76%)";
                                    containerFinalMsg.style.height ="100%";
                                    containerFinalMsg.style.width = "100%";
                                    containerFinalMsg.style.position ="absolute"
                                    containerFinalMsg.style.top ="1px";
                                    containerFinalMsg.style.left = "0px";
                                    resultText.style.display ="flex";
                                    loseOrWin.textContent = "Has ganado 😎";
                                    correctWord.textContent = word;
                                },500)

                            }
                        }
                    })
                }
                else{
                    count += 1;
                    drawMan(count);
                    if(count === 6){
                        const resultText = document.querySelector('.final-msg');
                        setTimeout(()=>{
                            //Add audio for defeat screen
                            const defeatAudio = document.createElement('audio');
                            defeatAudio.src = "../sounds/defeatSound.mp3";
                            defeatAudio.volume = 0.3;
                            defeatAudio.play();
                            //Style for final msg screen
                            containerFinalMsg.style.background = "hsl(0deg 0% 5% / 76%)";
                            containerFinalMsg.style.height ="100%";
                            containerFinalMsg.style.width = "100%";
                            containerFinalMsg.style.position ="absolute"
                            containerFinalMsg.style.top ="1px";
                            containerFinalMsg.style.left = "0px";
                            resultText.style.display="flex";
                            loseOrWin.textContent = "Has perdido 🙁";
                            correctWord.textContent = word;
                        },500);
                    }
                    button.disabled = true;
                    let audioError = document.createElement('audio');
                    audioError.style.display ="none";
                    audioError.src ="../sounds/error_style_4_002.ogg";
                    audioError.volume = 0.25;
                    audioError.play(); 
                }
            })
            
        })
    }
    

    let {initialDrawing} = canvasCreator();

    initialDrawing();

    buttons();
    
    const playAgain = document.querySelector('.play__Again');
    playAgain.addEventListener('click',()=>{
        window.location.reload();
    })
}
GameStart();

startGame.addEventListener('click',()=>{
    containerHome.style.display = "none";
    keyContainer.style.display="flex";
    game.style.display='block';
})



btnswitch.addEventListener('click',()=>{
    body.classList.toggle('dark');
    sunIcon.className = sunIcon.className == 'bx bxs-sun' ? 'bx bx-moon' : 'bx bxs-sun';
    game.classList.toggle('dark')
    //localStorage for darkmode

    if(body.classList.contains('dark')){
        localStorage.setItem('dark','true')
    }else{
        localStorage.setItem('dark','false');
    }
    //localStorage for sun icon
    if(sunIcon.classList.contains('bxs-sun')){
        localStorage.setItem('sun','true')
    }else{
        localStorage.setItem('sun','false')
    }
    //localStorage for moon icon
    if(sunIcon.classList.contains('bx-moon')){
        localStorage.setItem('moon','true')
    }else{
        localStorage.setItem('moon','false')
    }
})


//Getting item from localStorage
if(localStorage.getItem("dark") === "true"){
    body.classList.add('dark');
}else{
    body.classList.remove('dark');
}

if(localStorage.getItem("sun") === "true"){
    sunIcon.classList.replace('bx-moon','bxs-sun');
}else if(localStorage.getItem('moon') ==='true'){
    sunIcon.classList.replace('bxs-sun','bx-moon');
}



