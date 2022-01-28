function decodeGameBoy(_in) {
    let address;
    let value;
    let check;
    let flag;
    let digit;
    let _out;

    if(_in[3] == '-') {
        if(_in.length == 7) {
            flag = 0;
        }else if(_in.length == 11 && _in[7] == '-') {
            flag = 1;
        }else {
            document.getElementById("conv").innerText = mensaje;
            return false;
        }
    }else {
        document.getElementById("conv").innerText = mensaje;
        return false;
    }
    for (i = 0 ; i < _in.length ; i++) {
        digit = parseInt(_in[i], 16);
        if(_in[i] != '-' && isNaN(digit)) {
            document.getElementById("conv").innerText = mensaje;
            return false;
        }
        if(i == 6 && digit < 0x8) {
            document.getElementById("conv").innerText = mensaje;
            return false;
        }
    }
    value = orHex8bit(parseInt(_in[0],16), parseInt(_in[1],16));
    value = value.toString(16)
    value = formatHex(value, 2);
    address = (parseInt(_in[2],16) << 8) | (parseInt(_in[4],16) << 4) | parseInt(_in[5],16) |
    ((~(parseInt(_in[6],16)) & 0xF) << 12);
    address = address.toString(16)
    address = formatHex(address, 4);
    _out = address.toString(16) + ":" + value.toString(16);
    if(flag) {
        check = orHex8bit(parseInt(_in[8],16), parseInt(_in[10],16));
        check = ~check;
        check = (((check & 0xFC) >> 2) | ((check & 0x03) << 6)) ^ 0x45;
        check = check.toString(16)
        check = formatHex(check, 2);
        _out += ":" + check;
    }
    _out = _out.toUpperCase();
    document.getElementById("conv").innerText = _out;
    return _out;
}

function encodeGameBoy(_in) {
    let temp;
    let check;
    let flag;
    let digit;
    let _out;

    if(_in[4] == ':')
    {
        if(_in.length == 10 && _in[7] == ':'){
            flag = 1;
        }else if(_in.length == 7) {
            flag = 0;
        }else {
            document.getElementById("conv").innerText = mensaje;
            return false;
        }
    }else{
        document.getElementById("conv").innerText = mensaje;
        return false;
    }
    for (i = 0 ; i < _in.length ; i++) {
        digit = parseInt(_in[i], 16);
        if(_in[i] != ':' && isNaN(digit)) {
            document.getElementById("conv").innerText = mensaje;
            return false;
        }
        if(i == 0 && digit > 0x7) {
            document.getElementById("conv").innerText = mensaje;
            return false;
        }
    }
    _out = _in[5] + _in[6] + _in[1] + "-" + _in[2] + _in[3];
    _out += ((~parseInt(_in[0],16) & 0xF)).toString(16)
    if(flag){
        check = orHex8bit(parseInt(_in[8], 16), parseInt(_in[9], 16));
        check ^= 0x45;
        check = ~(((check & 0xC0) >> 6) | ((check & 0x3F) << 2));
        temp = (check & 0xF0) >> 4;
        _out += "-" + (temp & 0xF).toString(16)
            + ((temp ^ 0x8) & 0xF).toString(16)
            + (check & 0xF).toString(16);
    }
    _out = _out.toUpperCase();
    document.getElementById("conv").innerText = _out;
    return _out;
}