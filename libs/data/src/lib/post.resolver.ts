import { Resolver } from '@nestjs/graphql'
import { createBaseResolver } from './create-base-resolver'
import { CreatePostInput } from './create-post.input'
import { Post } from './post'
import { PostService } from './post.service'
import { UpdatePostInput } from './update-post-input'

@Resolver(() => Post)
export class PostResolver extends createBaseResolver<Post>(
  'post',
  // @ts-ignore
  Post,
  CreatePostInput,
  UpdatePostInput,
) {
  constructor(private readonly service: PostService) {
    super()
  }
}
