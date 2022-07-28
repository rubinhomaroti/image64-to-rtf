const imageinfo = require('imageinfo');

/**
 * Convert a base64 image to a RTF image code.
 * @param {string} base64 Base64 image.
 * @param {int} dpi DPI of the image (100 default).
 * @param {string} alignment Alignment of the image (LEFT, RIGHT, CENTER, JUSTIFY).
 * @returns {string} RTF image code.
 */
function image64ToRtf(base64 = '', dpi = 100, alignment = 'CENTER') {
    const buffer = Buffer.from(base64, 'base64');

    const info = imageinfo(buffer);
    const twipRatio = ((72 / dpi) * 20);
    const twipWidth = Math.round(info.width * twipRatio);
    const twipHeight = Math.round(info.height * twipRatio);

    const alignments = {
        LEFT: "\\ql",
        RIGHT: "\\qr",
        CENTER: "\\qc",
        JUSTIFY: "\\qj"
    };

    var rtf = `{\\pard${alignments[alignment.toUpperCase()]}\\line{\\pict\\pngblip\\picw${info.width}\\pich${info.height}\\picwgoal${twipWidth}\\pichgoal${twipHeight} `;

    const bufSize = buffer.length;
    for (var i = 0; i < bufSize; i++) {
        var hex = buffer[i].toString(16);
        rtf += (hex.length === 2) ? hex : "0" + hex;
    }

    return `${rtf}}\\par}}`;
}

module.exports = image64ToRtf;