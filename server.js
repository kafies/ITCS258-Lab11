const express = require('express');
const app = express();
app.use(express.json());
const port = Number(process.env.PORT || 3000);
const hotelName = process.env.HOTEL_NAME || 'ICT Hotel!!!!!!!!!!!!!!';

const rooms = [
  { id: 1, name: 'Single Room?????', pricePerNight: 667, available: true },
  { id: 2, name: 'Triple Room', pricePerNight: 1676, available: true },
  { id: 3, name: 'Suite Deluxe', pricePerNight: 2500, available: false },
];

app.get('/', (_req, res) => {
  res.json({ hotel: hotelName, message: 'Welcome to the hotel API!!!!!!!!!!!!', lab: 11 });
});
app.get('/health', (_req, res) => {
  res.json({ status: 'ok' });
});
app.get('/rooms', (_req, res) => {
  res.json(rooms);
});
app.get('/rooms/:id', (req, res) => {
  const room = rooms.find((r) => r.id === Number(req.params.id));
  if (!room) return res.status(404).json({ error: 'Room not found' });
  res.json(room);
});

const server = app.listen(port, '0.0.0.0', () => {
  console.log(`${hotelName} API listening on port ${port}`);
});
process.on('SIGTERM', () => server.close(() => process.exit(0)));
