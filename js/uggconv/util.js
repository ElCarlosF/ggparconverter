const mensaje = "No es un formato válido!";

function easterEgg(){
    document.getElementById("copyright").innerHTML = "<img src='./images/cats-keyboard.gif' height='100' width='100'></img>";
}


function orHex8bit(x, y) {
    return (x << 4) | y;
}

function indexChar(_char, c) {
    let i;
    for(i = 0 ; i < _char.length ; i++) {
        if(c == _char[i]) return i;
    }
    return -1;
}

function formatHex(hex, lenCorrect){
    let i;
    let len;

    len = hex.length
    if(len < lenCorrect)
    {
        for(i = 0 ; i < (lenCorrect - len) ; i++)
        {
            hex = '0' + hex;
        }
    }
    return hex;
}

function checkOption() {
    let code;
    let op;
    code = document.getElementById("text1").value;
    op = document.getElementById("console").value
    if(op != "SN")
    {
        if(document.getElementById("PAR").checked) {
            if(code) {
                if(op === "gameboy") {
                    encodeGameBoy(code);
                }else if(op === "genesis") {
                    encodeMD(code);
                }else if(op === "nes") {
                    encodeNES(code);
                }else if(op === "snes") {
                    encodeSNES(code);
                }
            }else {
                document.getElementById("conv").innerText = "Ingrese código!";
            }
        }else if(document.getElementById("GG").checked) {
            if(code) {
                if(op === "gameboy") {
                    decodeGameBoy(code);
                }else if(op === "genesis") {
                    decodeMD(code);
                }else if(op === "nes") {
                    decodeNES(code);
                }else if(op === "snes") {
                    decodeSNES(code);
                }
            }else {
                document.getElementById("conv").innerText = "Ingrese código!";
            }
        }else{
            alert("Seleccione Pro Action Replay o Game Genie");
        }
        return;
    }
    alert("Seleccione una consola");
}