let activeWindow = null;
let startX = 0;
let startY = 0;

document.addEventListener("mousedown", function(e) {
    
    const win = e.target.closest(".window");
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

    activeWindow.style.left = (activeWindow.offsetLeft + dx) + "px";
    activeWindow.style.top  = (activeWindow.offsetTop + dy) + "px";
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
