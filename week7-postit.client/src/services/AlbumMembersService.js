import { AppState } from "../AppState"
import { logger } from "../utils/Logger"
import { api } from "./AxiosService"

class AlbumMembersService{

  async getMembers(albumId){
    const res = await api.get('api/albums/' + albumId + '/album-members')
    AppState.albummembers = res.data
    logger.log('get members service', AppState.albummembers)
  }

}

export const albumMembersService = new AlbumMembersService()