import * as hapi from '@hapi/hapi'
import { isNil } from 'ramda'
import * as responses from '../utils/responses'
import * as repo from './repo'
import { SearchTutor } from './types'

export const search = async (
  request: hapi.Request,
  h: hapi.ResponseToolkit
): Promise<hapi.ResponseObject> => {
  const options = request.query as SearchTutor
  const result = await repo.search(options)
  return responses.data(h, result)
}

export const profile = async (
  request: hapi.Request,
  h: hapi.ResponseToolkit
): Promise<hapi.ResponseObject> => {
  const options = request.params as { tutor: string }
  const result = await repo.get(options.tutor)
  if (isNil(result)) {
    return responses.notfound(h, 'tutor-not-found', 'invalid id')
  }
  return responses.data(h, result)
}
