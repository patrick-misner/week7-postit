import { Auth0Provider } from "@bcwdev/auth0provider";
import { albumsService } from "../services/AlbumsService";
import BaseController from "../utils/BaseController";



export class AlbumController extends BaseController {
  constructor() {
    super('api/albums')
    this.router
    .get ('/', this.getAll)
    .get ('/:id', this.getById)
    // .get ('/:id/pictures', this.getPictures)
    .use(Auth0Provider.getAuthorizedUserInfo)
    .post ('/', this.create)
    .put ('/:id', this.edit)
    .delete ('/:id', this.delete)
  }


  async getAll(req, res, next){
      try {
        const albums = await albumsService.getAll(req.query)
        return res.send(albums)
      } catch (error) {
        next(error)
      }
  }

  async getById(req, res, next){
    try {
      const albums = await albumsService.getById(req.params.id)
      return res.send(albums)
    } catch (error) {
      next(error)
    }
}

 async create(req, res, next){
    try {
      req.body.creatorId = req.userInfo.id
      const album = await albumsService.create(req.body)
      return res.send(album)
    } catch (error) {
      next(error)
    }
 }

 async edit(req, res, next){
    try {
      req.body.creatorId = req.userInfo.id
      req.body.id = req.params.id
      const update = await albumsService.edit(req.body)
    } catch (error) {
      next(error)
    }
 }

 async delete (req, res, next){
  try {
    await albumsService.delete(req.params.id, req.userinfo.id)
    return res.send({ message: "Deleted Album" })
  } catch (error) {
    next(error)
  }
 }
}