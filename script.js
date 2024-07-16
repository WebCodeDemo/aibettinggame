// Initialize player's cash
let playerCash = 1000;
const playerCashElement = document.getElementById('player-cash');

// Update the displayed cash amount
function updateCashDisplay() {
    playerCashElement.textContent = playerCash;
}

// Function to handle betting
function placeBet(type, amount) {
    if (amount > playerCash) {
        alert("You don't have enough cash for this bet!");
        return;
    }

    playerCash -= amount;
    updateCashDisplay();

    let result;
    let winnings = 0;

    switch (type) {
        case 'lottery':
            result = Math.random() < 0.1; // 10% chance of winning
            winnings = result ? amount * 10 : 0;
            break;
        case 'steamroller':
            result = Math.random() < 0.5; // 50% chance of winning
            winnings = result ? amount * 2 : 0;
            break;
        case 'coin-toss':
            result = Math.random() < 0.5; // 50% chance of winning
            winnings = result ? amount * 2 : 0;
            break;
        case 'stock':
            let stockChange = (Math.random() - 0.5) * 0.2; // Random change between -10% and +10%
            winnings = Math.round(amount * (1 + stockChange));
            result = winnings > amount;
            break;
    }

    playerCash += winnings;
    updateCashDisplay();

    if (result) {
        alert(`Congratulations! You won $${winnings} on the ${type} bet!`);
    } else {
        alert(`Sorry, you lost your $${amount} bet on ${type}.`);
    }

    if (playerCash <= 0) {
        alert("Game over! You've run out of cash.");
        resetGame();
    }
}

// Function to reset the game
function resetGame() {
    playerCash = 1000;
    updateCashDisplay();
}

// Event listener for bet buttons
document.querySelectorAll('.bet-button').forEach(button => {
    button.addEventListener('click', function() {
        const type = this.getAttribute('data-type');
        let amount = this.getAttribute('data-amount');

        if (amount === 'custom') {
            const customAmountInput = document.querySelector('.custom-amount');
            amount = parseInt(customAmountInput.value);
            if (isNaN(amount) || amount <= 0) {
                alert("Please enter a valid bet amount.");
                return;
            }
        } else {
            amount = parseInt(amount);
        }

        placeBet(type, amount);
    });
});

// Initialize the game
updateCashDisplay();
