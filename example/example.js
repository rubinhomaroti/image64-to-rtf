const fs = require('fs');
const image64ToRtf = require('../index');

const base64 = fs.readFileSync('./example/zelda.png', 'base64');
const rtf = image64ToRtf(base64, 100, 'CENTER');
fs.appendFileSync('./example/zelda.rtf', `{\\rtf1\\ansi\\ansicpg1252\\deff0\\nouicompat${rtf}}`);
