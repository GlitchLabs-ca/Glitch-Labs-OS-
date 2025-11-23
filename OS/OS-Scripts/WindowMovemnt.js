let activeWindow = null;
let startX = 0;
let startY = 0;

document.addEventListener("mousedown", function(e) {

    const win = e.target.closest(".window");


    const allWindows = document.querySelectorAll(".window");

    allWindows.forEach(win => {
        if (win !== activeWindow) {
            win.style.zIndex = 99; // send to back
            win.classList.add('inactiveWindow');

        }
    })


    win.style.zIndex = 100; // bring to front
    win.classList.remove('inactiveWindow');
    if (!win) return;

    if (isInResizeArea(e, win)) return;

    activeWindow = win;
    startX = e.clientX;
    startY = e.clientY;

    document.addEventListener("mousemove", mouseMove);
    document.addEventListener("mouseup", mouseUp);
    
});










function mouseMove(e) {
    if (!activeWindow) return;

    const dx = e.clientX - startX;
    const dy = e.clientY - startY;

    startX = e.clientX;
    startY = e.clientY;

    let newLeft = activeWindow.offsetLeft + dx;
    let newTop  = activeWindow.offsetTop + dy;

    // --- SCREEN BOUNDARIES ---
    const winWidth = activeWindow.offsetWidth;
    const winHeight = activeWindow.offsetHeight;

    const screenWidth = window.innerWidth;
    const screenHeight = window.innerHeight;

    // clamp X
    if (newLeft < 0) newLeft = 0;
    if (newLeft + winWidth > screenWidth)
        newLeft = screenWidth - winWidth;

    // clamp Y
    if (newTop < 0) newTop = 0;
    if (newTop + winHeight > screenHeight)
        newTop = screenHeight - winHeight;

    activeWindow.style.left = newLeft + "px";
    activeWindow.style.top  = newTop + "px";
}


function mouseUp() {
    activeWindow = null;
    document.removeEventListener("mousemove", mouseMove);
    document.removeEventListener("mouseup", mouseUp);
}


function isInResizeArea(e, win) {
    const rect = win.getBoundingClientRect();
    const margin = 20;

    return (
        e.clientX > rect.right - margin &&
        e.clientY > rect.bottom - margin
    );
}




const terminateButtons = document.querySelectorAll('.terminateWindow');

terminateButtons.forEach(button => {
    button.addEventListener('click', () => {
        const windowElement = button.closest('.window');
        if (windowElement) {
            windowElement.remove();
            // add an aplication manager update function here
        }
    });
});


const minimizeButtons = document.querySelectorAll('.minimizeWindow');

minimizeButtons.forEach(button => {
    button.addEventListener('click', () => {
        const windowElement = button.closest('.window');
        if (windowElement) {
            windowElement.style.display = 'none';
            // add an aplication manager update function here
        }
    });
});


const fullScreenButtons = document.querySelectorAll('.FullScreenWindow');

fullScreenButtons.forEach(button => {
    button.addEventListener('click', () => {
        const windowElement = button.closest('.window');
        if (windowElement) {
            if (!windowElement.classList.contains('fullscreen')) {
                windowElement.classList.add('fullscreen');
                windowElement.style.width = '90vw';
                windowElement.style.height = '90vh';
            } else {
                windowElement.classList.remove('fullscreen');
                windowElement.style.width = '400px';
                windowElement.style.height = '300px';
            }
            // add an aplication manager update function here
        }
    });
});
