import knex from 'knex'
import mockKnex from 'mock-knex'

import getProject from '../handler'
import * as getDbConnection from '../../util/database/getDbConnection'

let dbConnectionToMock
let dbTracker

beforeEach(() => {
  jest.clearAllMocks()

  jest.spyOn(getDbConnection, 'getDbConnection').mockImplementationOnce(() => {
    dbConnectionToMock = knex({
      client: 'pg',
      debug: false
    })

    // Mock the db connection
    mockKnex.mock(dbConnectionToMock)

    return dbConnectionToMock
  })

  dbTracker = mockKnex.getTracker()
  dbTracker.install()
})

afterEach(() => {
  dbTracker.uninstall()
})

describe('getProject', () => {
  test('returns the project name and path', async () => {
    const projectId = 123
    const name = 'Test project'
    const path = '/search?p=C123456-EDSC'

    dbTracker.on('query', (query, step) => {
      if (step === 1) {
        query.response({
          name,
          path
        })
      } else {
        query.response(undefined)
      }
    })

    const event = {
      queryStringParameters: {
        projectId
      }
    }

    const result = await getProject(event)

    const expectedBody = JSON.stringify({ name, path })

    const { queries } = dbTracker.queries
    expect(queries[0].method).toEqual('first')

    expect(result.body).toEqual(expectedBody)
  })
})