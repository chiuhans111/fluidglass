function getUrlParam(name, defaultValue, parseFn = (v) => v) {
    const params = new URLSearchParams(window.location.search);
    let value = params.get(name);
    try {
        if (value !== null) {
            return parseFn(value);
        }
    } catch (e) {
        // ignore parse error
    }
    return defaultValue;
}

function hexToRgb(hex) {
    hex = hex.replace(/^#/, "");
    if (hex.length === 3) {
        hex = hex
            .split("")
            .map((x) => x + x)
            .join("");
    }
    const num = parseInt(hex, 16);
    const r = ((num >> 16) & 255) / 255;
    const g = ((num >> 8) & 255) / 255;
    const b = (num & 255) / 255;
    return [r, g, b];
}


export { getUrlParam, hexToRgb }