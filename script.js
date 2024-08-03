document.addEventListener('DOMContentLoaded', () => {
    const wheel = document.getElementById('wheel');
    const spinButton = document.getElementById('spin-button');
    const resetButton = document.getElementById('reset-button');
    const selectedNumbersContainer = document.getElementById('selected-numbers');
    const popup = document.getElementById('popup');
    const popupMessage = document.getElementById('popup-message');
    const popupClose = document.getElementById('popup-close');
    const indicator = document.getElementById('indicator');
    let numbers = Array.from({ length: 30 }, (_, i) => i + 1);
    let spinDuration = 5000; // Fixed duration for smooth spinning

    // Function to initialize the wheel with numbers
    const initializeWheel = () => {
        wheel.innerHTML = '';
        const angleStep = 360 / numbers.length;
        numbers.forEach((num, index) => {
            const angle = angleStep * index;
            const numberDiv = document.createElement('div');
            numberDiv.className = 'number';
            numberDiv.style.transform = `rotate(${angle}deg) translateY(-140px) rotate(-${angle}deg)`;
            numberDiv.textContent = num;
            wheel.appendChild(numberDiv);
        });
    };

    // Function to spin the wheel
    const spinWheel = () => {
        if (numbers.length === 0) return;

        const randomIndex = Math.floor(Math.random() * numbers.length);
        const selectedNumber = numbers[randomIndex];
        const angle = (360 / numbers.length) * randomIndex;

        // Set the transition and rotation
        wheel.style.transition = `transform ${spinDuration}ms cubic-bezier(0.2, 0.6, 0.8, 0.4)`;
        wheel.style.transform = `rotate(-${angle + 360 * 3}deg)`;

        // Reset the transition after spin
        setTimeout(() => {
            wheel.style.transition = 'none';
            wheel.style.transform = `rotate(-${angle + 360 * 3}deg)`;
            setTimeout(() => {
                wheel.style.transition = `transform ${spinDuration}ms cubic-bezier(0.2, 0.6, 0.8, 0.4)`;
            }, 50);
        }, spinDuration);

        setTimeout(() => {
            showPopup(selectedNumber);
            numbers.splice(randomIndex, 1);
            updateSelectedNumbers(selectedNumber);
            initializeWheel();
        }, spinDuration);
    };

    // Function to show popup with selected number
    const showPopup = (number) => {
        popupMessage.textContent = `Selected Number: ${number}`;
        popup.style.display = 'block';
    };

    // Function to update selected numbers list
    const updateSelectedNumbers = (number) => {
        const numberDiv = document.createElement('div');
        numberDiv.textContent = number;
        selectedNumbersContainer.appendChild(numberDiv);
        selectedNumbersContainer.scrollTop = selectedNumbersContainer.scrollHeight;
    };

    // Function to reset the wheel
    const resetWheel = () => {
        numbers = Array.from({ length: 30 }, (_, i) => i + 1);
        initializeWheel();
        selectedNumbersContainer.innerHTML = '';
        popup.style.display = 'none';
    };

    // Initialize the wheel
    initializeWheel();

    // Event listeners
    spinButton.addEventListener('click', spinWheel);
    resetButton.addEventListener('click', resetWheel);

    // Popup close button
    popupClose.addEventListener('click', () => {
        popup.style.display = 'none';
    });
});
