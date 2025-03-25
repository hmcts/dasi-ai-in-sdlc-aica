import { Router } from 'express';

const router = Router();

router.get('/search-option', (req, res) => {
  res.render('search/option');
});

export default router;
