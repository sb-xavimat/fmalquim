// UTILS
function log(...t) { console.log(...t);}
/**
 * Parseja una fórmula amb dos elements i dos subíndexs
 * @param {string} fmla
 */
function parseFmla(fmla) {
    // Útils
    const isUpperCase = c => c === c.toUpperCase();
    const isNumber = c => !isNaN(parseInt(c));

    // Inicialització
    const result = { symb1: "", sub1: "", symb2: "", sub2: "" };
    let current;

    // Parsejat
    fmla.split("").forEach(c => {
        // Comença dada nova:
        // - si és majúscula
        // - si és un número i no s'estava parsejant un número
        const start = (
            isUpperCase(c)
            || (isNumber(c) && current !== "sub1" && current !== "sub2")
        );
        // Si comença dada nova:
        if (start) {
            if (current === undefined) { current = "symb1" }
            else if (current === "symb1") { current = "sub1"; }
            else if (current === "sub1") { current = "symb2"; }
            else if (current === "symb2") { current = "sub2"; }
            else if (current === "sub2") { result.error = "Fmla incorrecta"; }
        }
        result[current] += c;
    });

    return result;
}

