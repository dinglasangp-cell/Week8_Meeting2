const express = require('express');
const cors = require('cors');

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

const orders = [
    {
        id: 1,
        customerName: "Maria Santos",
        loadCount: 2,
        status: "Pending",
        dropOffTime: "8:00 AM"
    },
    {
        id: 2,
        customerName: "Pedro Reyes",
        loadCount: 1,
        status: "Washing",
        dropOffTime: "9:15 AM"
    },
    {
        id: 3,
        customerName: "Ana Cruz",
        loadCount: 3,
        status: "Ready for Pickup",
        dropOffTime: "7:30 AM"
    }
];

app.get('/', (req, res) => {
    res.send('Laundry API is running!');
});

app.get('/orders', (req, res) => {
    res.json(orders);
});

app.put('/orders/:id', (req, res) => {
    const order = orders.find(
        o => o.id === parseInt(req.params.id)
    );

    if (!order) {
        return res.status(404).json({
            error: "Order not found"
        });
    }

    if (!req.body.status) {
        return res.status(400).json({
            error: "Status is required"
        });
    }

    order.status = req.body.status;

    res.json(order);
});

app.delete('/orders/:id', (req, res) => {
    const index = orders.findIndex(
        o => o.id === parseInt(req.params.id)
    );

    if (index === -1) {
        return res.status(404).json({
            error: "Order not found"
        });
    }

    const removed = orders.splice(index, 1);

    res.json({
        message: "Order cancelled",
        cancelledOrder: removed[0]
    });
});

app.listen(PORT, () => {
    console.log(`Laundry API running at http://localhost:${PORT}`);
});