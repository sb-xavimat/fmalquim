// MARK: createHTMLCard
/**
 * Creates a chemical explanation card as a DOM element.
 *
 * @param {Object} cardData - The data for the card in the format:
 * {
 *  "lines": [
 *    {"left": [{"text": "text1", "color": "color1"}, ...], "right": "explanation1"},
 *    {"left": [{"text": "text2", "color": "color2"}, ...], "right": "explanation2"},
 *    // more lines...
 *  ]
 * }
 * @returns {HTMLElement|null} - The card DOM element, or null if cardData is invalid.
 */
function createHTMLCard(cardData) {
    // MARK: Constants
    // --- Style Constants ---
    const CARD_COLORS = {
        orange: '#FF9800',
        red: '#F44336',
        grey: '#9E9E9E',
        green: '#4CAF50',
        lilac: '#CE93D8',
        lightGreen: '#8BC34A'
    };

    const CARD_CONTAINER_STYLE = {
        width: '395px',
        maxHeight: '540px',
        backgroundColor: 'white',
        borderRadius: '12px',
        boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        lineHeight: 'normal',
    };

    const CARD_CONTENT_STYLE = {
        padding: '16px',
        flexGrow: '1',
        overflowY: 'auto'
    };

    const CHEMICAL_NAME_STYLE = {
        fontSize: '20px',
        fontWeight: 'bold',
        textAlign: 'center',
        padding: '16px',
        marginBottom: '8px',
        backgroundColor: '#f0f0f0',
        borderRadius: '8px',
        lineHeight: '1.4'
    };

    const STEPS_CONTAINER_STYLE = {
        borderTop: '1px solid #eee',
        paddingTop: '12px',
        position: 'relative'
    };

    const STEP_CONTAINER_STYLE = {
        display: 'flex',
        marginBottom: '16px',
        alignItems: 'flex-start',
        position: 'relative',
        paddingLeft: '28px' // Make room for step number
    };

    const STEP_NUMBER_STYLE = {
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
    };

    const STEP_LEFT_STYLE = {
        flex: '1',
        fontWeight: '500',
        paddingRight: '12px',
        minWidth: '120px',
        fontSize: '16px'
    };

    const STEP_RIGHT_STYLE = {
        flex: '2',
        color: '#555',
        fontSize: '16px'
    };

    const FINAL_RESULT_STYLE = {
        marginTop: '24px',
        textAlign: 'center',
        fontSize: '24px',
        fontWeight: 'bold',
        padding: '12px',
        backgroundColor: '#f8f8f8',
        borderRadius: '8px'
    };

    // MARK: Utils
    /**
     * Applies subscript styling to a span element if the text is a number or numeric string.
     * @param {HTMLSpanElement} span - The span element to style.
     * @param {string|number} text - The text content to check for subscript formatting.
     */
    function applySubscriptStyle(span, text) {
        if (typeof text === 'number' || (typeof text === 'string' && !isNaN(text))) {
            Object.assign(span.style, {
                fontSize: '75%',
                verticalAlign: 'sub',
                lineHeight: '0'
            });
        }
    }

    /**
     * Creates a styled span element for text with optional color and subscript.
     * @param {Object} item - Object with text and color properties.
     * @returns {HTMLSpanElement} - The styled span element.
     */
    function createStyledSpan(item) {
        const span = document.createElement('span');
        span.textContent = item.text;
        span.style.color = CARD_COLORS[item.color] || '#000000'; // Default color if not found
        applySubscriptStyle(span, item.text);
        return span;
    }

    // MARK: Main
    // Input validation: Check if cardData is an object, has lines property, and lines is an array with at least 2 elements.
    if (!cardData || !cardData.lines || !Array.isArray(cardData.lines) || cardData.lines.length < 2) {
        console.warn("Invalid cardData provided to createChemicalCard:", cardData); // Log a warning for invalid input
        return null;
    }

    // Destructure colors for easier access
    const { lilac } = CARD_COLORS;

    // --- Card Container ---
    const card = document.createElement('div');
    Object.assign(card.style, CARD_CONTAINER_STYLE);

    // --- Card Content Container ---
    const cardContent = document.createElement('div');
    Object.assign(cardContent.style, CARD_CONTENT_STYLE);
    card.appendChild(cardContent);

    // --- Chemical Name/Formula Section (First Line) ---
    const chemicalName = document.createElement('div');
    Object.assign(chemicalName.style, CHEMICAL_NAME_STYLE);

    // Add styled text elements for the first line (chemical name)
    cardData.lines[0].left.forEach(item => {
        chemicalName.appendChild(createStyledSpan(item));
    });
    cardContent.appendChild(chemicalName);


    // --- Steps Container ---
    const stepsContainer = document.createElement('div');
    Object.assign(stepsContainer.style, STEPS_CONTAINER_STYLE);
    cardContent.appendChild(stepsContainer);


    // --- Steps (starting from index 1) ---
    for (let i = 1; i < cardData.lines.length; i++) {
        const stepData = cardData.lines[i];

        // --- Step Container ---
        const step = document.createElement('div');
        Object.assign(step.style, STEP_CONTAINER_STYLE);

        // --- Step Number ---
        const stepNumber = document.createElement('div');
        Object.assign(stepNumber.style, STEP_NUMBER_STYLE);
        stepNumber.textContent = i;
        step.appendChild(stepNumber);

        // --- Left Part (formula/name building) ---
        const stepLeft = document.createElement('div');
        Object.assign(stepLeft.style, STEP_LEFT_STYLE);

        // Add styled text elements for the left part of the step
        stepData.left.forEach(item => {
            stepLeft.appendChild(createStyledSpan(item));
        });
        step.appendChild(stepLeft);


        // --- Right Part (explanation) ---
        const stepRight = document.createElement('div');
        Object.assign(stepRight.style, STEP_RIGHT_STYLE);

        let rightText = stepData.right;
        if (rightText && rightText.includes("_")) { // Check if rightText exists before processing
            // Colorize "_‑uro_" or "_‑ur_". Using template literals for better readability.
            rightText = rightText
                .replace(/_‑uro_/g, `<span style='color:${lilac}'><i>‑uro</i></span>`)
                .replace(/_‑ur_/g, `<span style='color:${lilac}'><i>‑ur</i></span>`);
            // Convert the first and second "_" into <i> and </i>. Using replace once for each.
            rightText = rightText.replace(/_/, "<i>").replace(/_/, "</i>");
        }
        stepRight.innerHTML = rightText || ''; // Set to empty string if rightText is null/undefined to avoid errors
        step.appendChild(stepRight);

        stepsContainer.appendChild(step);
    }

    // --- Final Result Section ---
    if (cardData.lines.length > 1) {
        const finalResult = document.createElement('div');
        Object.assign(finalResult.style, FINAL_RESULT_STYLE);

        // Use the last line's left part for the final result
        const lastLine = cardData.lines[cardData.lines.length - 1];
        lastLine.left.forEach(item => {
            finalResult.appendChild(createStyledSpan(item));
        });
        stepsContainer.appendChild(finalResult);
    }

    return card;
}
