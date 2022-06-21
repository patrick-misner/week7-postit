import { AppState } from "../AppState"
import { logger } from "../utils/Logger"
import { api } from "./AxiosService"

class PicturesService{
  
async getPictures(albumId){
  const res = await api.get('api/albums/' + albumId +'/pictures')
  logger.log('get pictures for this album', res.data)
  AppState.pictures = res.data
}


}

export const picturesService = new PicturesService()