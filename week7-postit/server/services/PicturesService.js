import { dbContext } from "../db/DbContext"
import { BadRequest, Forbidden } from "../utils/Errors"


class PicturesService {
  async getAll(query = {}){
    const pictures = await  dbContext.Pictures.find(query)
    return pictures
  }

  async getById(id){
    const picture = await dbContext.Pictures.findById(id).populate('creator', 'name picture')
    if (!picture){
      throw new BadRequest('invalid ID')
    }
    return picture
  }
  async create(pictureData){
    const picture = await dbContext.Pictures.create(pictureData)
    await picture.populate('creator', 'picture name')
    return picture
  }
  async edit(update){
    const original = await this.getById(update.id)
    if (original.creatorId.toString() != update.creatorId){
      throw new Forbidden('not your picture')
    }
    original.imgURL = update.imgURL || original.imgURL
    original.albumId = update.albumId || original.albumId

    await original.save()
    return original
  }
  async delete(pictureId, userId){
    const picture = await this.getById(pictureId)
    if (picture.creatorId.toString() != userId){
      throw new Forbidden('not your picture')
    }
    await picture.remove()
  }
}

export const picturesService = new PicturesService()