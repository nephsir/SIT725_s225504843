// Initialize Socket.IO connection
const socket = io();

// Store selected ratings for each book
let selectedRatings = {};

// Connection status
socket.on('connect', () => {
    console.log('✅ Connected to server');
    updateConnectionStatus(true);
});

socket.on('disconnect', () => {
    console.log('❌ Disconnected from server');
    updateConnectionStatus(false);
});

// Update connection status indicator
function updateConnectionStatus(connected) {
    const statusEl = document.getElementById('connectionStatus');
    if (connected) {
        statusEl.textContent = '● Connected';
        statusEl.className = 'status connected';
    } else {
        statusEl.textContent = '● Disconnected';
        statusEl.className = 'status disconnected';
    }
}

// Receive initial ratings when connecting
socket.on('initialRatings', (books) => {
    console.log('📚 Received initial book ratings:', books);
    renderBooks(books);
});

// Receive real-time rating updates
socket.on('ratingUpdate', (data) => {
    console.log('📊 Rating updated:', data);
    updateBookRating(data.bookId, data.averageRating, data.ratingCount);
});

// Render books on page load
function renderBooks(books) {
    const container = document.getElementById('booksContainer');
    container.innerHTML = '';
    
    for (const [bookId, book] of Object.entries(books)) {
        const bookCard = createBookCard(bookId, book);
        container.appendChild(bookCard);
    }
}

// Create book card HTML
function createBookCard(bookId, book) {
    const card = document.createElement('div');
    card.className = 'book-card';
    card.id = `book-${bookId}`;
    
    card.innerHTML = `
        <div class="book-title">${book.title}</div>
        <div class="book-author">by ${book.author}</div>
        
        <div class="rating-display">
            <div class="current-rating" id="rating-${bookId}">
                ${book.averageRating || '0.0'} ⭐
            </div>
            <div class="rating-count" id="count-${bookId}">
                ${book.ratingCount} ${book.ratingCount === 1 ? 'rating' : 'ratings'}
            </div>
        </div>
        
        <div class="rating-section">
            <label class="rating-label">Rate this book:</label>
            <div class="stars" id="stars-${bookId}">
                ${[1, 2, 3, 4, 5].map(num => 
                    `<span class="star" data-rating="${num}" onclick="selectRating('${bookId}', ${num})">★</span>`
                ).join('')}
            </div>
        </div>
    `;
    
    return card;
}

// Handle star selection (auto-submit)
function selectRating(bookId, rating) {
    selectedRatings[bookId] = rating;
    
    // Update star display
    const stars = document.querySelectorAll(`#stars-${bookId} .star`);
    stars.forEach((star, index) => {
        if (index < rating) {
            star.classList.add('active');
        } else {
            star.classList.remove('active');
        }
    });
    
    // Auto-submit immediately
    console.log(`📤 Auto-submitting rating: ${rating} stars for book ${bookId}`);
    
    // Send rating to server via Socket.IO
    socket.emit('submitRating', {
        bookId: bookId,
        rating: rating
    });
    
    // Reset selection after a brief delay to show feedback
    setTimeout(() => {
        document.querySelectorAll(`#stars-${bookId} .star`).forEach(star => {
            star.classList.remove('active');
        });
        selectedRatings[bookId] = null;
    }, 500);
}

// Update book rating display (with animation)
function updateBookRating(bookId, averageRating, ratingCount) {
    const ratingEl = document.getElementById(`rating-${bookId}`);
    const countEl = document.getElementById(`count-${bookId}`);
    const cardEl = document.getElementById(`book-${bookId}`);
    
    if (ratingEl && countEl) {
        // Add pulse animation
        cardEl.classList.add('update-animation');
        setTimeout(() => cardEl.classList.remove('update-animation'), 600);
        
        // Update display
        ratingEl.textContent = `${averageRating} ⭐`;
        countEl.textContent = `${ratingCount} ${ratingCount === 1 ? 'rating' : 'ratings'}`;
    }
}