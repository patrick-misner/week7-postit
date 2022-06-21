import { api } from "./AxiosService"

class AlbumMembersService{

  async getMembers(albumId){
    const members = await api.get('')
  }

}

export const albumMembersService = new AlbumMembersService()