// Get History Info Items
const historyItems = Array.from(document.querySelectorAll('.history-items .history-info-item'));
// Get History Count
const historyItemsCount = historyItems.length;
// Set Current Item
let currentItem = 0;
// Get Since Year Element
let sinceYear = document.getElementById('sinceYear');
// Get Years List UL Element
let yearsList = document.getElementById('yearsList');
// Get Navigation Elements
let prevIcon = document.getElementById("prev");
let nextIcon = document.getElementById("next");

// Handle Previous and Next links
prevIcon.onclick = prevItem;
nextIcon.onclick = nextItem;


// Next Item Function
function nextItem() {
    currentItem++;
    // Call Set Current Class Function
    setCurrent();
    if (currentItem % 5 == 0) {
        yearsList.scrollBy(0, 320);
        yearsList.scrollBy(320, 0);
    }
}
// Previous Item Function
function prevItem() {
    currentItem--;
    // Call Set Current Class Function
    setCurrent();
    if (currentItem % 5 == 0) {
        yearsList.scrollBy(0, -320);
        yearsList.scrollBy(-320, 0);
    }
}

// Create List Items Based On Histry Items Count
for (let i = 0; i < historyItemsCount; i++) {
    let yearItem = document.createElement('li');
    // Set Item Content
    yearItem.appendChild(document.createTextNode(historyItems[i].getAttribute('data-year')));
    // Append Items to Years List UL Element
    yearsList.appendChild(yearItem);
}
// Call Set Current Class Function
setCurrent();

// Checker Function
function setCurrent() {
    // Call remove current classes function from history items and years list items
    removeCurrentClass();
    // Set Since Year element content
    sinceYear.innerText = historyItems[currentItem].getAttribute('data-year');
    // Set current class on current item
    historyItems[currentItem].classList.add('current');
    // Set current calss on current years list item
    yearsList.children[currentItem].classList.add('current');
    // Check if history items more than 9
    if (historyItemsCount >= 9) {
        prevIcon.style.visibility = 'visible';
        nextIcon.style.visibility = 'visible';
    }
    // Check if current item is the first
    if (currentItem == 0) {
        prevIcon.style.visibility = 'hidden';
    }
    // Check if current item is the Last
    if (currentItem == historyItemsCount - 1) {
        nextIcon.style.visibility = 'hidden';
    }
}

// Remove current class from histoy items and years list
function removeCurrentClass() {
    // Remove from history items
    historyItems.forEach(function (element) {
        element.classList.remove('current');
    });
    // Remove from Years List
    Array.prototype.forEach.call(yearsList.children, element => {
        element.classList.remove('current');
    })
}
// Handle Years List hover
for (let i = 0; i < yearsList.children.length; i++) {
    yearsList.children[i].onmouseover = function () {
        currentItem = i;
        // Call Set Current Class Function
        setCurrent();
    }
}
// Keyboard Navigation
document.onkeydown = function (e) {
    e = e || window.event;
    switch (e.keyCode) {
        case 37: {
            prevItem();
            break;
        }
        case 39: {
            nextItem();
            break;
        }
    }
};