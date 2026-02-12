// Utility functions for gesture detection

/**
 * Detects a swipe gesture based on start and end coordinates.
 * @param {Object} start - The starting coordinates of the gesture.
 * @param {Object} end - The ending coordinates of the gesture.
 * @returns {String} - The direction of the swipe: 'left', 'right', 'up', 'down', or 'none'.
 */
function detectSwipe(start, end) {
    const deltaX = end.x - start.x;
    const deltaY = end.y - start.y;
    const threshold = 30; // minimum distance for a valid swipe

    if (Math.abs(deltaX) > Math.abs(deltaY)) {
        // Left or Right swipe
        return deltaX > threshold ? 'right' : (deltaX < -threshold ? 'left' : 'none');
    } else {
        // Up or Down swipe
        return deltaY > threshold ? 'down' : (deltaY < -threshold ? 'up' : 'none');
    }
}

/**
 * Detects if a tap gesture occurred based on the touch event.
 * @param {Object} event - The touch event object.
 * @returns {Boolean} - Returns true if a tap gesture is detected.
 */
function detectTap(event) {
    return event.touches.length === 1;
}

/**
 * Detects a pinch gesture based on two touch points.
 * @param {Object} touch1 - The first touch point.
 * @param {Object} touch2 - The second touch point.
 * @returns {Number} - The distance between the two touch points.
 */
function detectPinch(touch1, touch2) {
    const dx = touch2.clientX - touch1.clientX;
    const dy = touch2.clientY - touch1.clientY;
    return Math.sqrt(dx * dx + dy * dy);
}

export { detectSwipe, detectTap, detectPinch };