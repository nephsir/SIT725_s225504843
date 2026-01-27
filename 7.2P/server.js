const express = require('express');
const path = require('path');

const app = express();
const PORT = 3000;

// Create HTTP server from Express app
const http = require('http').createServer(app);

// Pass HTTP server to Socket.IO
const io = require('socket.io')(http);

// Middleware
app.use(express.static(path.join(__dirname, 'public')));

// In-memory book ratings storage
const books = {
    'b1': { 
        title: 'The Three-Body Problem', 
        author: 'Liu Cixin', 
        totalRating: 0, 
        ratingCount: 0,
        averageRating: 0,
        ratingsList: []
    },
    'b2': { 
        title: 'Jane Eyre', 
        author: 'Charlotte Brontë', 
        totalRating: 0, 
        ratingCount: 0,
        averageRating: 0,
        ratingsList: []
    },
    'b3': { 
        title: 'Pride and Prejudice', 
        author: 'Jane Austen', 
        totalRating: 0, 
        ratingCount: 0,
        averageRating: 0,
        ratingsList: []
    }
};

// Socket.IO connection handling
io.on('connection', (socket) => {
    console.log('✅ User connected:', socket.id);
    
    // Send current ratings to newly connected user
    socket.emit('initialRatings', books);
    
    // Listen for rating submissions
    socket.on('submitRating', (data) => {
        const { bookId, rating } = data;
        
        if (books[bookId]) {
            // Update book rating
            books[bookId].totalRating += rating;
            books[bookId].ratingCount += 1;
            books[bookId].averageRating = (books[bookId].totalRating / books[bookId].ratingCount).toFixed(1);
            
            // Add rating to the list (keep last 20 ratings)
            books[bookId].ratingsList.push(rating);
            if (books[bookId].ratingsList.length > 20) {
                books[bookId].ratingsList.shift(); // Remove oldest if more than 20
            }
            
            console.log(`📊 New rating for ${books[bookId].title}: ${rating} stars`);
            console.log(`📈 Average: ${books[bookId].averageRating} (${books[bookId].ratingCount} ratings)`);
            console.log(`📋 Ratings list: [${books[bookId].ratingsList.join(', ')}]`);
            
            // Broadcast updated ratings to ALL connected clients
            io.emit('ratingUpdate', {
                bookId: bookId,
                averageRating: books[bookId].averageRating,
                ratingCount: books[bookId].ratingCount,
                ratingsList: [...books[bookId].ratingsList] // Send a copy of the array
            });
        }
    });
    
    // Handle user disconnect
    socket.on('disconnect', () => {
        console.log('❌ User disconnected:', socket.id);
    });
});

// Root route
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Start server with HTTP (not app.listen)
http.listen(PORT, () => {
    console.log(`🚀 Server running at http://localhost:${PORT}`);
    console.log(`📡 Socket.IO ready for real-time connections`);
});