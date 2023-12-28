import * as Chroma from "../../../node_modules/chroma-js/chroma.js";


function cartesianToPolar(x, y) {
    // Calculate r (magnitude)
    const r = Math.sqrt(x*x + y*y);

    // Calculate theta (angle)
    let theta = Math.atan2(y, x);

    // Convert theta to degrees
    theta = theta * 180 / Math.PI;

    // Adjust theta to be between 0 and 360 degrees
    if (theta < 0) {
        theta = 360 + theta;
    }

    // Return polar coordinates
    return { r, theta };
}

function findAngle(mouseX, mouseY, element) {
    const elementRect = element.getBoundingClientRect();
    const elementCenterX = elementRect.left + elementRect.width / 2;
    const elementCenterY = elementRect.top + elementRect.height / 2;

    const dx = mouseX - elementCenterX;
    const dy = mouseY - elementCenterY;
    const angle = Math.atan2(dy, dx) * (180 / Math.PI);

    return angle;
}
function findDistance(mouseX, mouseY, element) {
    const elementRect = element.getBoundingClientRect();
    const elementCenterX = elementRect.left + elementRect.width / 2;
    const elementCenterY = elementRect.top + elementRect.height / 2;

    const dx = mouseX - elementCenterX;
    const dy = mouseY - elementCenterY;
    const distance = Math.sqrt(dx * dx + dy * dy);
    return distance;
}


function calcBlur(r){
    if (r > 100){
        return .5;
    }else{
        return  10 - ( r * .07);
    }
}
const mainGlow = document.querySelector('#pricing');
mainGlow.addEventListener('mousemove', function(event) {
    document.querySelectorAll('#pricing .glow-outer').forEach(function (element) {

        let rect = element.getBoundingClientRect();
        let xDistance, yDistance;

        if (event.clientX < rect.left) {
            xDistance = rect.left - event.clientX;
        } else if (event.clientX > rect.right) {
            xDistance = event.clientX - rect.right;
        } else {
            xDistance = 0;
        }

        if (event.clientY < rect.top) {
            yDistance = rect.top - event.clientY;
        } else if (event.clientY > rect.bottom) {
            yDistance = event.clientY - rect.bottom;
        } else {
            yDistance = 0;
        }

        let data = cartesianToPolar(xDistance,yDistance);
        element.querySelector('.before').style.filter = 'blur('+ calcBlur(data.r)+'px)';
        const angle = findAngle(event.clientX, event.clientY, element);


        const r = findDistance(event.clientX, event.clientY, element);
        element.querySelector('.before').style.backgroundImage = `
    conic-gradient(
                      from ${angle - 90}deg at 50% 50%,
                      rgba(0, 0, 0, 0) 0%,
                      rgba(0, 0, 0, 0) 33%,
                      red 50%,
                      rgba(0, 0, 0, 0) 66%,
                      rgba(0, 0, 0, 0) 100%)`;

        let rect2 = mainGlow.getBoundingClientRect();
        let rect3 = element.getBoundingClientRect();
        let mouseX = event.clientX - rect3.left ;
        let mouseY = event.clientY - rect3.top;
        // console.log(mouseX,mouseY);

        // Display the mouse coordinates inside the element

        element.querySelector('.glow-circle').style.left = (mouseX -135) +'px' ;
        element.querySelector('.glow-circle').style.top = (mouseY-135)+'px' ;
    });

});

const generateGlowButtons = () => {
    document.querySelectorAll(".glow-button").forEach((button) => {
        let gradientElem = button.querySelector('.gradient');

        if(!gradientElem) {
            gradientElem = document.createElement("div");
            gradientElem.classList.add("gradient");

            button.appendChild(gradientElem);
        }

        button.addEventListener("pointermove", (e) => {
            const rect = button.getBoundingClientRect();

            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            gsap.to(button, {
                "--pointer-x": `${x}px`,
                "--pointer-y": `${y}px`,
                duration: 0.6,
            });

            gsap.to(button, {
                "--button-glow": chroma
                    .mix(
                        getComputedStyle(button)
                            .getPropertyValue("--button-glow-start")
                            .trim(),
                        getComputedStyle(button).getPropertyValue("--button-glow-end").trim(),
                        x / rect.width
                    )
                    .hex(),
                duration: 0.2,
            });
        });
    });
}

// Set variables on loaded
document.addEventListener('DOMContentLoaded', generateGlowButtons);

// Set variables on resize
window.addEventListener('resize', generateGlowButtons);
