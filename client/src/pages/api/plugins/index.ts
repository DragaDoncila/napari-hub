import { NextApiRequest, NextApiResponse } from 'next';

export default function getPluginIndex(
  _: NextApiRequest,
  res: NextApiResponse,
): void {
  res.json({ 'napari-compressed-labels-io': '0.0.0' });
}
