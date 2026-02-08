const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const PORT = 3001; // React runs on 3000/5173, we use 3001 for backend

app.use(cors());
app.use(bodyParser.json());

// Store invoices in memory (RAM)
let invoices = [];

// 1. Endpoint for Salesforce to PUSH data
app.post('/api/invoices', (req, res) => {
    const newInvoice = {
        invoiceId: 'INV-' + Math.floor(Math.random() * 10000),
        ...req.body, // Data from Salesforce (project_name, amount)
        receivedAt: new Date().toISOString(),
        status: 'Generated'
    };
    invoices.unshift(newInvoice); // Add to top of list
    console.log('🔔 New Invoice Received:', newInvoice.project_name);
    res.status(201).json({ message: 'Success', invoiceId: newInvoice.invoiceId });
});

// 2. Endpoint for React Frontend to GET data
app.get('/api/invoices', (req, res) => {
    res.json(invoices);
});

app.listen(PORT, () => {
    console.log(`🚀 ERP Server running at http://localhost:${PORT}`);
});