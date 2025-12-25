import { forwardRef, Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { userSchema } from './schema/user.schema';
import { postsSchema } from 'src/posts/schema/post.schema';
import { PostsModule } from 'src/posts/posts.module';

@Module({
  imports:[
    MongooseModule.forFeature([{name:"user",schema:userSchema}]),
    // MongooseModule.forFeature([{name:"post",schema:postsSchema}])
    forwardRef(() => PostsModule)
],
  controllers: [UsersController],
  providers: [UsersService],
  exports:[UsersService]
})
export class UsersModule {}
