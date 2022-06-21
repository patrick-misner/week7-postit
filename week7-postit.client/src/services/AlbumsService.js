import { AppState } from "../AppState"
import { logger } from "../utils/Logger"
import { api } from "./AxiosService"

class AlbumsService {
  async getAlbums(query = ''){
    const res = await api.get('api/albums/' + query)
    logger.log('res from service', res.data)
    AppState.albums = res.data
  }
}

export const albumsService = new AlbumsService()