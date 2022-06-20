import { Auth0Provider } from "@bcwdev/auth0provider";
import { picturesService } from "../services/picturesService";
import BaseController from "../utils/BaseController";



export class PictureController extends BaseController {
  constructor() {
    super('api/pictures')
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
        const pictures = await picturesService.getAll(req.query)
        return res.send(pictures)
      } catch (error) {
        next(error)
      }
  }

  async getById(req, res, next){
    try {
      const pictures = await picturesService.getById(req.params.id)
      return res.send(pictures)
    } catch (error) {
      next(error)
    }
}

 async create(req, res, next){
    try {
      req.body.creatorId = req.userInfo.id
      const picture = await picturesService.create(req.body)
      return res.send(picture)
    } catch (error) {
      next(error)
    }
 }

 async edit(req, res, next){
    try {
      req.body.creatorId = req.userInfo.id
      req.body.id = req.params.id
      const update = await picturesService.edit(req.body)
      return res.send(update)
    } catch (error) {
      next(error)
    }
 }

 async delete (req, res, next){
  try {
    await picturesService.delete(req.params.id, req.userInfo.id)
    return res.send({ message: "Deleted picture" })
  } catch (error) {
    next(error)
  }
 }
}