const express = require('express');
const bodyParser = require('body-parser');
const db = require('./db');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());

// 1. POST /transactions
app.post('/transactions', (req, res) => {
    const { type, category_id, amount, date, description } = req.body;
    const query = `INSERT INTO transactions (type, category_id, amount, date, description)
                   VALUES (?, ?, ?, ?, ?)`;
    db.run(query, [type, category_id, amount, date, description], function(err) {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json({ id: this.lastID });
    });
});

// 2. GET /transactions
app.get('/transactions', (req, res) => {
    db.all("SELECT * FROM transactions", [], (err, rows) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json(rows);
    });
});

// 3. GET /transactions/:id
app.get('/transactions/:id', (req, res) => {
    const { id } = req.params;
    db.get("SELECT * FROM transactions WHERE id = ?", [id], (err, row) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json(row);
    });
});

// 4. PUT /transactions/:id
app.put('/transactions/:id', (req, res) => {
    const { id } = req.params;
    const { type, category_id, amount, date, description } = req.body;
    const query = `UPDATE transactions SET type = ?, category_id = ?, amount = ?, date = ?, description = ?
                   WHERE id = ?`;
    db.run(query, [type, category_id, amount, date, description, id], function(err) {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json({ updated: this.changes });
    });
});

// 5. DELETE /transactions/:id
app.delete('/transactions/:id', (req, res) => {
    const { id } = req.params;
    db.run("DELETE FROM transactions WHERE id = ?", [id], function(err) {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json({ deleted: this.changes });
    });
});

// 6. GET /summary
app.get('/summary', (req, res) => {
    const { startDate, endDate, category } = req.query;
    let query = `SELECT type, SUM(amount) as total FROM transactions WHERE 1=1`;
    const params = [];

    if (startDate) {
        query += ` AND date >= ?`;
        params.push(startDate);
    }
    if (endDate) {
        query += ` AND date <= ?`;
        params.push(endDate);
    }
    if (category) {
        query += ` AND category_id = ?`;
        params.push(category);
    }
    query += ` GROUP BY type`;

    db.all(query, params, (err, rows) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        let totalIncome = 0, totalExpense = 0;
        rows.forEach(row => {
            if (row.type === 'income') totalIncome = row.total;
            if (row.type === 'expense') totalExpense = row.total;
        });
        res.json({ totalIncome, totalExpense, balance: totalIncome - totalExpense });
    });
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
