const genesisChar = "ABCDEFGHJKLMNPRSTVWXYZ0123456789";

function decodeMD(_in) {
    //document.getElementById("conv").innerHTML = "Programando...<br><img src='./images/cats-keyboard.gif' height='100' width='100'></img>";
    let address;
    let value;
    let data;
    let _out;

    _in = _in.toUpperCase();
    if(_in.length != 9 || _in[4] != '-') {
        document.getElementById("conv").innerText = mensaje;
        return false;
    }
    for(i = 0 ; i < 9 ; i++) {
        if(_in[i] != '-' && indexChar(genesisChar, _in[i]) == -1) {
            document.getElementById("conv").innerText = mensaje;
            return false;
        }
    }
    data = new Array(8);
    for(i = 0 ; i < 4 ; i++) {
        data[i] = indexChar(genesisChar, _in[i]);
    }
    for(i = 5 ; i < 9 ; i++) {
        data[i - 1] = indexChar(genesisChar, _in[i]);
    }
    address = 0;
    address |= (data[3] & 0x0f) << 20;
    address |= (data[4] & 0x1e) << 15;
    address |= (data[1] & 0x03) << 14;
    address |= (data[2] & 0x1f) << 9;
    address |= (data[3] & 0x10) << 4;
    address |= (data[6] & 0x07) << 5;
    address |= (data[7] & 0x1f);
    value = 0;
    value |= (data[5] & 0x01) << 15;
    value |= (data[6] & 0x18) << 10;
    value |= (data[4] & 0x01) << 12;
    value |= (data[5] & 0x1e) << 7;
    value |= (data[0] & 0x1f) << 3;
    value |= (data[1] & 0x16) >> 2;
    _out = formatHex(address.toString(16), 6) + ":" + formatHex(value.toString(16), 4);
    _out = _out.toUpperCase();
    document.getElementById("conv").innerText = _out;
    return _out;
}

function encodeMD(_in) {
    //document.getElementById("conv").innerHTML = "Programando...<br><img src='./images/cats-keyboard.gif' height='100' width='100'></img>";
    let address;
    let value;
    let digit;
    let data;
    let _out;

    if(_in.length != 11 || _in[6] != ':') {
        document.getElementById("conv").innerText = mensaje;
        return false;
    }
    for(i = 0 ; i < 11 ; i++) {
        digit = parseInt(_in[i], 16);
        if(_in[i] != ':' && isNaN(digit)) {
            document.getElementById("conv").innerText = mensaje;
            return false;
        }
    }
    data = _in.split(":");
    address = parseInt(data[0], 16);
    value = parseInt(data[1], 16);
    data = new Array(8);
    data[3] |= (address >> 20) & 0xF;
    data[4] |= (address >> 15) & 0x1E;
    data[1] |= (address >> 14) & 0x3;
    data[2] |= (address >> 9) & 0x1F;
    data[3] |= (address >> 4) & 0x10;
    data[6] |= (address >> 5) & 0x7;
    data[7] |= (address & 0x1F);
    data[5] |= (value >> 15) & 0x1;
    data[6] |= (value >> 10) & 0x18;
    data[4] |= (value >> 12) & 0x1;
    data[5] |= (value >> 7) & 0x1E;
    data[0] |= (value >> 3) & 0x1F;
    data[1] |= (value << 2) & 0x16;
    _out = "";
    for(i = 0 ; i < 4 ; i++) {
        _out += genesisChar[data[i]];
    }
    _out += '-';
    for(i = 5 ; i < 9 ; i++) {
        _out += genesisChar[data[i - 1]];
    }
    _out = _out.toUpperCase();
    document.getElementById("conv").innerText = _out;
    return _out;
}
