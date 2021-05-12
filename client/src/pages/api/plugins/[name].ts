import { NextApiRequest, NextApiResponse } from 'next';

import index from '@/fixtures/index.json';
import plugin from '@/fixtures/napari.json';

export default function getPluginIndex(
  req: NextApiRequest,
  res: NextApiResponse,
): void {
  const { name } = req.query;

  if (name === 'index') {
    res.json(index);
  } else {
    res.json(plugin);
  }
}
