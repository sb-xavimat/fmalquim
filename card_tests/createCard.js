/**
 * Creates a chemical explanation card as a DOM element
 * @param {Object} cardData - The data for the card in the format:
 * {
 *  "lines": [
 *    {"left": [{"text": "text1", "color": "color1"}, ...], "right": "explanation1"},
 *    {"left": [{"text": "text2", "color": "color2"}, ...], "right": "explanation2"},
 *    // more lines...
 *  ]
 *}
 * @returns {HTMLElement} - The card DOM element
 */
function createHTMLCard(cardData) {

    if (!cardData && cardData.lines.length < 2) {
        return null;
    }

    // Define colors
    const colors = {
        orange: '#FF9800',
        red: '#F44336',
        grey: '#9E9E9E',
        green: '#4CAF50',
        lilac: '#CE93D8',
        lightGreen: '#8BC34A'
    };

    // Create the main card container
    const card = document.createElement('div');
    Object.assign(card.style, {
        width: '395px',
        maxHeight: '540px',
        backgroundColor: 'white',
        borderRadius: '12px',
        boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        lineHeight: 'normal',
    });

    // Create card content container
    const cardContent = document.createElement('div');
    Object.assign(cardContent.style, {
        padding: '16px',
        flexGrow: '1',
        overflowY: 'auto'
    });
    card.appendChild(cardContent);

    // Create chemical name/formula section (first line)
    const chemicalName = document.createElement('div');
    Object.assign(chemicalName.style, {
        fontSize: '20px',
        fontWeight: 'bold',
        textAlign: 'center',
        padding: '16px',
        marginBottom: '8px',
        backgroundColor: '#f0f0f0',
        borderRadius: '8px',
        lineHeight: '1.4'
    });

    // Add the colored text elements for the first line
    cardData.lines[0].left.forEach(item => {
        const span = document.createElement('span');
        span.textContent = item.text;
        span.style.color = colors[item.color] || '#000000';

        // Handle subscripts if needed
        if (typeof item.text === 'number' || (typeof item.text === 'string' && !isNaN(item.text))) {
            span.style.fontSize = '75%';
            span.style.verticalAlign = 'sub';
            span.style.lineHeight = '0';
        }

        chemicalName.appendChild(span);
    });

    cardContent.appendChild(chemicalName);

    // Create steps container
    const stepsContainer = document.createElement('div');
    Object.assign(stepsContainer.style, {
        borderTop: '1px solid #eee',
        paddingTop: '12px',
        position: 'relative'
    });
    cardContent.appendChild(stepsContainer);

    // Create steps (starting from index 1 since index 0 is the title)
    for (let i = 1; i < cardData.lines.length; i++) {
        const stepData = cardData.lines[i];

        // Create step container
        const step = document.createElement('div');
        Object.assign(step.style, {
            display: 'flex',
            marginBottom: '16px',
            alignItems: 'flex-start',
            position: 'relative',
            paddingLeft: '28px' // Make room for step number
        });

        // Create step number
        const stepNumber = document.createElement('div');
        Object.assign(stepNumber.style, {
            position: 'absolute',
            left: '0',
            top: '0',
            width: '22px',
            height: '22px',
            backgroundColor: '#f0f0f0',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '12px',
            fontWeight: '600',
            color: '#666'
        });
        stepNumber.textContent = i;
        step.appendChild(stepNumber);

        // Create left part (formula/name building)
        const stepLeft = document.createElement('div');
        Object.assign(stepLeft.style, {
            flex: '1',
            fontWeight: '500',
            paddingRight: '12px',
            minWidth: '120px',
            fontSize: '16px'
        });

        // Add colored text elements for the left part
        stepData.left.forEach(item => {
            const span = document.createElement('span');
            span.textContent = item.text;
            span.style.color = colors[item.color] || '#000000';

            // Handle subscripts
            if (typeof item.text === 'number' || (typeof item.text === 'string' && !isNaN(item.text))) {
                span.style.fontSize = '75%';
                span.style.verticalAlign = 'sub';
                span.style.lineHeight = '0';
            }

            stepLeft.appendChild(span);
        });

        step.appendChild(stepLeft);

        // Create right part (explanation)
        const stepRight = document.createElement('div');
        Object.assign(stepRight.style, {
            flex: '2',
            color: '#555',
            fontSize: '16px'
        });
        let rightText = stepData.right;
        if (rightText.includes("_")) {
            // Coloregem els "_‑uro_" o "_‑ur_".
            const { lilac } = colors;
            rightText = rightText
                .replace("_‑uro_", `<span style='color:${lilac}'><i>‑uro</i></span>`)
                .replace("_‑ur_", `<span style='color:${lilac}'><i>‑ur</i></span>`);
            // Convertir el primer "_" en <i> y el segundo en </i>
            rightText = rightText.replace("_", "<i>").replace("_", "</i>");
        }
        stepRight.innerHTML = rightText;
        step.appendChild(stepRight);

        stepsContainer.appendChild(step);
    }

    // Create final result
    if (cardData.lines.length > 1) {
        const finalResult = document.createElement('div');
        Object.assign(finalResult.style, {
            marginTop: '24px',
            textAlign: 'center',
            fontSize: '24px',
            fontWeight: 'bold',
            padding: '12px',
            backgroundColor: '#f8f8f8',
            borderRadius: '8px'
        });

        // Use the last line's left part for the final result
        const lastLine = cardData.lines[cardData.lines.length - 1];
        lastLine.left.forEach(item => {
            const span = document.createElement('span');
            span.textContent = item.text;
            span.style.color = colors[item.color] || '#000000';

            // Handle subscripts
            if (typeof item.text === 'number' || (typeof item.text === 'string' && !isNaN(item.text))) {
                span.style.fontSize = '75%';
                span.style.verticalAlign = 'sub';
                span.style.lineHeight = '0';
            }

            finalResult.appendChild(span);
        });

        stepsContainer.appendChild(finalResult);
    }

    return card;
}