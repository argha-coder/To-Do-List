console.log('Starting test...');

try {
    require('dotenv').config();
    console.log('dotenv loaded');
} catch (e) { console.error('dotenv failed', e); }

try {
    const express = require('express');
    console.log('express loaded');
} catch (e) { console.error('express failed', e); }

try {
    const cors = require('cors');
    console.log('cors loaded');
} catch (e) { console.error('cors failed', e); }

try {
    const mongoose = require('mongoose');
    console.log('mongoose loaded directly');
} catch (e) { console.error('mongoose failed', e); }

try {
    const connectDB = require('./config/db');
    console.log('db config loaded');
} catch (e) {
    console.error('db config failed');
    console.error(e.message);
    console.error(e.code);
    console.error(e);
}

try {
    const authRoutes = require('./routes/authRoutes');
    console.log('auth routes loaded');
} catch (e) {
    console.error('auth routes failed');
    console.error(e);
}

try {
    const todoRoutes = require('./routes/todoRoutes');
    console.log('todo routes loaded');
} catch (e) {
    console.error('todo routes failed');
    console.error(e);
}
