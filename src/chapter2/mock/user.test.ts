import axios from 'axios'
import Users from './users'

jest.mock('axios')
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe("jest.mock()を利用したモック化", () => {


  describe("外部モジュールをモック化", () => {

    test('should fetch all users', async () => {
      const users = [{name: "Bob"}]
      const resp = { data: users }

      mockedAxios.get.mockResolvedValue(resp)

      await expect(Users.search()).resolves.toEqual(users)
    })
  })
});
