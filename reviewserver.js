const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();

// Enhanced CORS configuration
const allowedOrigins = [
    'http://localhost', // Covers all localhost ports
    'http://127.0.0.1', // Covers all 127.0.0.1 ports
    'file://', // For direct file access
    'null' // For some edge cases
];

app.use(cors({
    origin: function (origin, callback) {
        // Allow requests with no origin (like mobile apps or curl requests)
        if (!origin) return callback(null, true);

        if (allowedOrigins.some(allowed => origin.startsWith(allowed))) {
            return callback(null, true);
        }

        const msg = `CORS blocked for origin: ${origin}`;
        console.error(msg);
        return callback(new Error(msg), false);
    },
    methods: ['GET', 'POST', 'OPTIONS'],
    allowedHeaders: ['Content-Type'],
    credentials: true
}));

app.use(express.json());

// MongoDB connection with better error handling
mongoose.connect('mongodb://127.0.0.1:27017/reviewsDB', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    serverSelectionTimeoutMS: 5000 // Timeout after 5s instead of 30s
})
    .then(() => console.log('MongoDB Connected Successfully'))
    .catch(err => {
        console.error('MongoDB Connection Error:', err);
        process.exit(1); // Exit if DB connection fails
    });

// Schema with validation
const reviewSchema = new mongoose.Schema({
    name: { type: String, required: true },
    department: { type: String, required: true },
    rating: {
        type: Number,
        min: 1,
        max: 5,
        required: true,
        set: v => Math.round(v) // Ensure whole numbers
    },
    feedback: { type: String, required: true },
    createdAt: { type: Date, default: Date.now }
});

const Review = mongoose.model('Review', reviewSchema);

// API Endpoints
app.post('/api/feedback', async (req, res) => {
    try {
        // Validate rating is between 1-5
        if (req.body.rating < 1 || req.body.rating > 5) {
            return res.status(400).json({ error: "Rating must be between 1 and 5" });
        }

        const review = new Review(req.body);
        const savedReview = await review.save();
        res.status(201).json(savedReview);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

app.get('/api/feedback', async (req, res) => {
    try {
        console.log('Fetching reviews...'); // Debug log
        const reviews = await Review.find().sort({ rating: -1 });
        console.log(`Found ${reviews.length} reviews`); // Debug log
        res.json(reviews);
    } catch (err) {
        console.error('GET /api/feedback error:', err);
        res.status(500).json({
            error: 'Failed to fetch reviews',
            details: err.message
        });
    }
});

// Add health check endpoint
app.get('/api/health', (req, res) => {
    res.json({
        status: 'OK',
        dbStatus: mongoose.connection.readyState,
        timestamp: new Date()
    });
});

const PORT = process.env.PORT || 5502;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
    console.log(`Try these endpoints:`);
    console.log(`http://localhost:${PORT}/api/health`);
    console.log(`http://localhost:${PORT}/api/feedback`);
});