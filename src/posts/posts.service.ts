import { Injectable } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class PostsService {
  constructor(@InjectModel("post") private postsModel:Model<any>,private usersService:UsersService){}

 async create(userId,createPostDto: CreatePostDto) {
    const newPost = await this.postsModel.create({...createPostDto,user:userId})
    await this.usersService.addPost(userId,newPost._id)
    return newPost
  }

  findAll() {
    return this.postsModel.find().populate("user")
  }

async findOne(id: string) {
  const user = await this.postsModel.findById(id).populate("user")
    return user
  }

 async update(id: string, updatePostDto: UpdatePostDto) {
   const updateuser = await this.postsModel.findByIdAndUpdate(id,updatePostDto,{new:true})
    return updateuser
  }

async  remove(id: string) {
    const deletedUser = await this.postsModel.findByIdAndDelete(id)
    return deletedUser
  }
}
