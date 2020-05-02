import { Injectable, Logger } from '@nestjs/common'
import { AbstractService } from './abstract.service'
import { CreatePostInput } from './create-post.input'
import { Post } from './post'
import { UpdatePostInput } from './update-post-input'

@Injectable()
export class PostService implements AbstractService<Post, CreatePostInput, UpdatePostInput> {
  public create(input: CreatePostInput): Promise<Post> {
    Logger.log('PostService.create')
    return Promise.resolve(undefined)
  }

  public delete(id: string): Promise<boolean> {
    Logger.log('PostService.delete')
    return Promise.resolve(false)
  }

  public findMany(): Promise<Post[]> {
    Logger.log('PostService.findMany')
    return Promise.resolve([])
  }

  public findOne(id: string): Promise<Post> {
    Logger.log('PostService.findOne')
    return Promise.resolve(undefined)
  }

  public update(id: string, input: UpdatePostInput): Promise<Post> {
    Logger.log('PostService.update')
    return Promise.resolve(undefined)
  }
}
