import { Auth0Provider } from "@bcwdev/auth0provider";
import { albumMembersService } from "../services/AlbumMembersService";
import BaseController from "../utils/BaseController";


export class AlbumMemberController extends BaseController {
  constructor(){
    super('api/album-members') 
      this.router
      .use(Auth0Provider.getAuthorizedUserInfo)
      .post('', this.create)
      .delete('/:id', this.delete)
    
  }

  async create(req, res, next){
    try {
      req.body.accountId = req.userInfo.id
      const member = await albumMembersService.create(req.body)
      return res.send(member)
    } catch (error) {
      next(error)
    }
  }
  async delete(req, res, next){
    try {
      await albumMembersService.delete(req.params.id, req.userInfo.id)
      return res.send('This album member has been deleted')
    } catch (error) {
      next(error)
    }
  }
}