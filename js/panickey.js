document.addEventListener('keydown', (event) => {
    panic(event);
});

function panic(event) {
    const panicURL = 'https://www.google.com/';
    const panicKey = "k"; 
    const keyPressed = event.key.toLowerCase();
    if (keyPressed === panicKey) {
        window.location.href = panicURL;
    }
}
