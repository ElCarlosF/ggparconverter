const snesChar = "DF4709156BC8A23E";

function decodeSNES(_in) {
    //document.getElementById("conv").innerHTML = "Programando...<br><img src='./images/cats-keyboard.gif' height='100' width='100'></img>";
    let address;
    let value;
    let transposed;
    let _out;

    if(_in.length == 9 && _in[4] == '-') {
        for(i = 0 ; i < 9 ; i++) {
            if(i != 4) {
                let digit;
                digit = parseInt(_in[i], 16);
                if(isNaN(digit)) {
                    document.getElementById("conv").innerText = mensaje;
                    return false;
                }
            }
        }
    }else {
        document.getElementById("conv").innerText = mensaje;
        return false;
    }
    _in = _in.toUpperCase();
    value = orHex8bit(indexChar(snesChar, _in[0]), indexChar(snesChar, _in[1]));
    transposed = indexChar(snesChar, _in[8]) +
                 (indexChar(snesChar, _in[7]) << 4) +
                 (indexChar(snesChar, _in[6]) << 8) +
                 (indexChar(snesChar, _in[5]) << 12) +
                 (indexChar(snesChar, _in[3]) << 16) +
                 (indexChar(snesChar, _in[2]) << 20);
    address = 0;
    address |= ((transposed & 0xc00000) >> 8);
    address |= (((transposed & (0xc00000 >> 2)) << 2) >> 10);
    address |= (((transposed & (0xc00000 >> 4)) << 4) >> 16);
    address |= (((transposed & (0xc00000 >> 6)) << 6) >> 18);
    address |= (((transposed & (0xc00000 >> 8)) << 8) >> 14);
    address |= (((transposed & (0xc00000 >> 10)) << 10));
    address |= (((transposed & (0xc00000 >> 12)) << 12) >> 2);
    address |= (((transposed & (0xc00000 >> 14)) << 14) >> 20);
    address |= (((transposed & (0xc00000 >> 16)) << 16) >> 22);
    address |= (((transposed & (0xc00000 >> 18)) << 18) >> 4);
    address |= (((transposed & (0xc00000 >> 20)) << 20) >> 6);
    address |= (((transposed & (0xc00000 >> 22)) << 22) >> 12);
    _out = formatHex(address.toString(16), 6) + ":" + formatHex(value.toString(16), 2);
    _out = _out.toUpperCase();
    document.getElementById("conv").innerText = _out;
    return _out;
}

function encodeSNES(_in) {
    //document.getElementById("conv").innerHTML = "Programando...<br><img src='./images/cats-keyboard.gif' height='100' width='100'></img>";
    let address;
    let value;
    let transposed;
    let _out;

    if(_in.length == 9 && _in[6] == ":") {
        for(i = 0 ; i < 9 ; i++) {
            if(i != 6) {
                let digit;
                digit = parseInt(_in[i], 16);
                if(isNaN(digit)) {
                    document.getElementById("conv").innerText = mensaje;
                    return false;
                }
            }
        }
    }else {
        document.getElementById("conv").innerText = mensaje;
        return false;
    }
    value = orHex8bit(parseInt(snesChar[_in[7]], 16), parseInt(snesChar[_in[8]], 16));
    address = parseInt(_in.split(":")[0], 16);
    transposed = 0;
    transposed |= (((address & (0xc00000 >> (2*4))) << (2*4)) >> (2*0));
    transposed |= (((address & (0xc00000 >> (2*5))) << (2*5)) >> (2*1));
    transposed |= (((address & (0xc00000 >> (2*8))) << (2*8)) >> (2*2));
    transposed |= (((address & (0xc00000 >> (2*9))) << (2*9)) >> (2*3));
    transposed |= (((address & (0xc00000 >> (2*7))) << (2*7)) >> (2*4));
    transposed |= (((address & (0xc00000 >> (2*0))) << (2*0)) >> (2*5));
    transposed |= (((address & (0xc00000 >> (2*1))) << (2*1)) >> (2*6));
    transposed |= (((address & (0xc00000 >> (2*10))) << (2*10)) >> (2*7));
    transposed |= (((address & (0xc00000 >> (2*11))) << (2*11)) >> (2*8));
    transposed |= (((address & (0xc00000 >> (2*2))) << (2*2)) >> (2*9));
    transposed |= (((address & (0xc00000 >> (2*3))) << (2*3)) >> (2*10));
    transposed |= (((address & (0xc00000 >> (2*6))) << (2*6)) >> (2*11));
    _out = formatHex(value.toString(16), 2).toUpperCase();
    _out += snesChar[(transposed & 0xf00000) >> 20] +
            snesChar[(transposed & 0x0f0000) >> 16] +
            "-" +
            snesChar[(transposed & 0x00f000) >> 12] +
            snesChar[(transposed & 0x000f00) >> 8] +
            snesChar[(transposed & 0x0000f0) >> 4] +
            snesChar[transposed & 0x00000f];
    document.getElementById("conv").innerText = _out;
    return _out;
}