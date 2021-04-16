import { NextApiRequest,
         NextApiResponse } from 'next'


/**
 * for trying out the ping attribute on a tags
 * <a ping="/api/log" ></a>
 */

export default (req: NextApiRequest, res: NextApiResponse) => {
  console.log(req)
  res.status(200).json(req.rawHeaders)
}