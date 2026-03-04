import { Router } from 'express';
import { getHistory, deleteScan } from '../utils/db';

const router = Router();

router.get('/', (req, res) => {
  try {
    const history = getHistory();
    res.json(history);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

router.delete('/:id', (req, res) => {
  try {
    deleteScan(req.params.id);
    res.status(204).send();
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
