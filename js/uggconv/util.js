function formatHex(hex, lenCorrect){
    if(hex.length < lenCorrect)
    {
        for(i = 0 ; i < (lenCorrect - hex.length) ; i++)
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