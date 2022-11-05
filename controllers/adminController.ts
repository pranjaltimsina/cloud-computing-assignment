import { Request, Response } from 'express'
import Idea from '../models/idea'
import { IIdea } from '../types/types'

interface makeRealRequestBody {
  gitlinks?: string[]
  deployedURLs?: string[]
}

const makeReal = async (req: Request, res: Response): Promise<Response> => {
  const ideaId = res.locals.ideaId || ''

  if (ideaId === '') {
    return res.status(400).json({ error: 'Bad request. Missing ideaId in request.' })
  }

  const stuff: makeRealRequestBody = req.body.idea

  stuff?.deployedURLs?.forEach(url => {
    try {
      Boolean(new URL(url))
    } catch (_) {
      return res.status(400).json({ error: `Bad Request. ${url} is not a valid URL.` })
    }
  })

  stuff?.gitlinks?.forEach(url => {
    try {
      Boolean(new URL(url))
    } catch (_) {
      return res.status(400).json({ error: `Bad Request. ${url} is not a valid URL.` })
    }
  })

  try {
    const theIdea: IIdea = await Idea.findOneAndUpdate()
    return res.status(504).json({ error: 'Not implemented' })
  } catch {
    return res.status(500).json({ error: 'Internal Server Error.' })
  }
}

const editReal = () => {

}

const approveOrReject = () => {

}

export {
  makeReal,
  editReal,
  approveOrReject
}
