document.addEventListener("DOMContentLoaded", function () {
    const temperatureInput = document.getElementById("temperature");
    const fromUnit = document.getElementById("fromUnit");
    const toUnit = document.getElementById("toUnit");
    const outputField = document.getElementById("output");

    function clearErrorMessage() {
        outputField.textContent = "";
    }

    function initializeUnits() {
        const fromValue = fromUnit.value;
        const toValue = toUnit.value;

        if (fromValue === toValue) {
            if (fromValue === "celsius") {
                toUnit.value = "fahrenheit";
            } else if (fromValue === "fahrenheit") {
                toUnit.value = "celsius";
            }
        }

        for (let i = 0; i < fromUnit.options.length; i++) {
            fromUnit.options[i].disabled = false;
            toUnit.options[i].disabled = false;
        }

        for (let i = 0; i < fromUnit.options.length; i++) {
            if (fromUnit.options[i].value === toValue) {
                fromUnit.options[i].disabled = true;
            }
        }

        for (let i = 0; i < toUnit.options.length; i++) {
            if (toUnit.options[i].value === fromValue) {
                toUnit.options[i].disabled = true;
            }
        }
    }

    function convertTemperature() {
        const temperature = parseFloat(temperatureInput.value);

        if (isNaN(temperature)) {
            outputField.textContent = "Please enter a valid temperature.";
            return;
        }

        clearErrorMessage();

        const from = fromUnit.value;
        const to = toUnit.value;

        let convertedTemperature;

        if (from === to) {
            outputField.textContent = "Please select different units.";
            return;
        }

        // Conversion logic
        if (from === "celsius") {
            if (to === "fahrenheit") {
                convertedTemperature = (temperature * 9/5) + 32;
            } else if (to === "kelvin") {
                convertedTemperature = temperature + 273.15;
            }
        } else if (from === "fahrenheit") {
            if (to === "celsius") {
                convertedTemperature = (temperature - 32) * 5/9;
            } else if (to === "kelvin") {
                convertedTemperature = (temperature - 32) * 5/9 + 273.15;
            }
        } else if (from === "kelvin") {
            if (to === "celsius") {
                convertedTemperature = temperature - 273.15;
            } else if (to === "fahrenheit") {
                convertedTemperature = (temperature - 273.15) * 9/5 + 32;
            }
        }

        // Display units as "C", "F", "K" with the degree symbol
        const fromSymbol = from === "celsius" ? "°C" : from === "fahrenheit" ? "°F" : "K";
        const toSymbol = to === "celsius" ? "°C" : to === "fahrenheit" ? "°F" : "K";

        outputField.textContent = `${convertedTemperature.toFixed(2)} ${toSymbol}`;
    }

    fromUnit.addEventListener("change", initializeUnits);
    toUnit.addEventListener("change", convertTemperature);

    document.getElementById("convertButton").addEventListener("click", convertTemperature);
    temperatureInput.addEventListener("input", function () {
        clearErrorMessage();
        convertTemperature();
    });

    initializeUnits();
});
