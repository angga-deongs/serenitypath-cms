// Prompt the user for the number of circles
var numCircles = parseInt(prompt("Enter the number of circles:"));

// Prompt the user for the radius
var radius = parseInt(prompt("Enter the radius:"));

// Prompt the user for the width of the viewBox
var viewBoxWidth = parseInt(prompt("Enter the width of the viewBox:"));

// Prompt the user for the height of the viewBox
var viewBoxHeight = parseInt(prompt("Enter the height of the viewBox:"));

// Calculate the degree interval based on the number of circles
var degreeInterval = 360 / numCircles;

// Create an array to store the circle coordinates
var circleCoordinates = [];

// Calculate the circle coordinates
for (var i = 0; i < numCircles; i++) {
    var degree = i * degreeInterval;
    var radians = (degree - 90) * (Math.PI / 180); // Convert degree to radians
    var x = Math.cos(radians) * radius;
    var y = Math.sin(radians) * radius;
    circleCoordinates.push({ x: x, y: y });
}

// Generate the SVG code
var svgCode = `<svg
    version="1.1"
    xmlns="http://www.w3.org/2000/svg"
    xmlns:xlink="http://www.w3.org/1999/xlink"
    x="0px"
    y="0px"
    width="${viewBoxWidth}px"
    height="${viewBoxHeight}px"
    viewBox="0 0 ${viewBoxWidth} ${viewBoxHeight}"
    style="overflow: visible;"
    xml:space="preserve"
    class="single_circle__outter-img"
>
    <circle cx="${viewBoxWidth / 2}" cy="${viewBoxHeight / 2}" r="${radius}" fill="none" class="dash"></circle>
`;

// Add the circle elements with the calculated coordinates
for (var i = 0; i < numCircles; i++) {
    var cx = circleCoordinates[i].x + viewBoxWidth / 2; // Offset by half of the viewBox width to center the circles
    var cy = circleCoordinates[i].y + viewBoxHeight / 2; // Offset by half of the viewBox height to center the circles
    svgCode += `    <circle cx="${cx}" cy="${cy}" r="8"></circle>\n`;
}

// Close the SVG code
svgCode += `</svg>`;

// Log the generated SVG code
console.log(svgCode);
