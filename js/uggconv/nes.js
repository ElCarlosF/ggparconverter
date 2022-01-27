const nesChar = "APZLGITYEOXUKSVN";

function decodeNES(_in) {
    //document.getElementById("conv").innerHTML = "Programando...<br><img src='./images/cats-keyboard.gif' height='100' width='100'></img>";
    let address;
    let value;
    let check;
    let flag;
    let data;
    let _out;

    if(_in.length == 8) {
        flag = 1;
    }else if(_in.length == 6) {
        flag = 0;
    }else {
        document.getElementById("conv").innerText = mensaje;
        return false;
    }
    _in = _in.toUpperCase();
    for(i = 0 ; i < _in.length ; i++) {
        if(indexChar(nesChar, _in[i]) == -1) {
            document.getElementById("conv").innerText = mensaje;
            return false;
        }
    }
    data = new Array(8);
    for(i = 0 ; i < 6 ; i++) {
        data[i] = indexChar(nesChar, _in[i]);
    }
    if(flag) {
        data[6] = indexChar(nesChar, _in[6]);
        data[7] = indexChar(nesChar, _in[7]);
    }
    address = 0x8000;
    address |= (data[1] & 8) << 4;
    address |= (data[2] & 7) << 4;
    address |= (data[3] & 7) << 12;
    address |= data[3] & 8;
    address |= data[4] & 7;
    address |= (data[4] & 8) << 8;
    address |= (data[5] & 7) << 8;
    if(flag) {
        value |= (data[0] & 7);
        value |= (data[0] & 8) << 4;
        value |= (data[1] & 7) << 4;
        value |= (data[7] & 8);
        check |= (data[6] & 7);
        check |= (data[6] & 8);
        check |= (data[6] & 8) << 4;
        check |= (data[7] & 7) << 4;
    }else {
        value |= (data[0] & 7);
        value |= (data[0] & 8) << 4;
        value |= (data[1] & 7) << 4;
        value |= (data[5] & 8);
    }
    _out = formatHex(address.toString(16), 4) + ":" + formatHex(value.toString(16), 2);
    if(flag) {
        _out += ":" + formatHex(check.toString(16), 2);
    }
    _out = _out.toUpperCase();
    document.getElementById("conv").innerText = _out;
    return _out;
}

function encodeNES(_in) {
    //document.getElementById("conv").innerHTML = "Programando...<br><img src='./images/cats-keyboard.gif' height='100' width='100'></img>";
    let address;
    let value;
    let check;
    let digit;
    let flag;
    let data;
    let _out;

    if(_in[4] == ":") {
        if(_in.length == 10 && _in[7] == ":") {
            flag = 1;
        }else if(_in.length == 7) {
            flag = 0;
        }else {
            document.getElementById("conv").innerText = mensaje;
            return false;
        }
    }else {
        document.getElementById("conv").innerText = mensaje;
        return false;
    }
    for(i = 0 ; i < _in.length ; i++) {
        digit = parseInt(_in[i], 16);
        if(_in[i] != ":" && isNaN(digit)) {
            document.getElementById("conv").innerText = mensaje;
            return false;
        }
    }
    data = _in.split(":");
    address = parseInt(data[0], 16);
    value = parseInt(data[1], 16);
    if(flag) {
        check = parseInt(data[2], 16);
    }
    data = new Array(8);
    data[1] |= (address >> 4) & 8;
    data[2] |= (address >> 4) & 7;
    data[3] |= (address >> 12) & 7;
    data[3] |= address & 8;
    data[4] |= address & 7;
    data[4] |= (address >> 8) & 8;
    data[5] |= (address >> 8) & 7;
    if(flag) {
        data[0] |= value & 7;
        data[0] |= (value >> 4) & 8;
        data[1] |= (value >> 4) & 7;
        data[7] |= value & 8;
        data[6] |= check & 7;
        data[6] |= check & 8;
        data[6] |= (check >> 4) & 8;
        data[7] |= (check >> 4) & 7;
    }else {
        data[0] |= value & 7;
        data[0] |= (value >> 4) & 8;
        data[1] |= (value >> 4) & 7;
        data[5] |= value & 8;
    }
    _out = "";
    for(i = 0 ; i < 6 ; i++) {
        _out += nesChar[data[i]];
    }
    if(flag) {
        _out += nesChar[data[6]];
        _out += nesChar[data[7]];
    }
    document.getElementById("conv").innerText = _out;
    return _out;
}
