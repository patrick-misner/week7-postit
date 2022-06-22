import { dbContext } from "../db/DbContext"
import { BadRequest, Forbidden } from "../utils/Errors"


class AlbumMembersService{

  async getAlbumMembers(albumId){
    const members = await dbContext.AlbumMembers.find({ albumId })
      .populate('account', 'name picture')
      .populate('album', 'name coverImg')
    return members
  }

  async create(memberData){ 
  const accountId = memberData.accountId
  const albumId = memberData.albumId
    const isMember = await dbContext.AlbumMembers.findOne({accountId, albumId}) 
    if (isMember){
      throw new Forbidden('you are already a member')
    }
    const member = await dbContext.AlbumMembers.create(memberData)
    await member.populate('account', 'name picture')
    await member.populate('album', 'name coverImg')
    return member
  }

async delete(id, userId){
const member = await dbContext.AlbumMembers.findById(id)
if (!member) {
  throw new BadRequest('This Id cant be found')
}

if (member.accountId.toString() != userId) {
  throw new Forbidden ("hey dude thats not your support")
}
await member.remove()
}

}

export const albumMembersService = new AlbumMembersService()