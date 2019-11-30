import express from 'express';
const router = express.Router();

router.get('/', (req, res) => {
  return res.send('Received a GET ALL HTTP method');
});
router.get('/:channelId', (req, res) => {
  return res.send(`Received a GET ONE HTTP method {${req.params.channelId}}`);
});
router.post('/', (req, res) => {
  return res.send('Received a POST HTTP method');
});
router.put('/', (req, res) => {
  return res.send('Received a PUT HTTP method');
});
router.delete('/', (req, res) => {
  return res.send('Received a DELETE HTTP method');
});

export default router;
