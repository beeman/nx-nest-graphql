import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'
import plur from 'plur'
import { upperFirst } from 'lodash'
import { AbstractService } from './abstract.service'

export function createBaseResolver<T extends any>(
  suffix: string,
  objectTypeCls: T,
  createInputCls: any,
  updateInputCls: any,
) {
  const plural = plur(suffix, 2)

  @Resolver({ isAbstract: true })
  abstract class BaseResolver {
    protected constructor(
      private readonly service: AbstractService<
        typeof objectTypeCls,
        typeof createInputCls,
        typeof updateInputCls
      >,
    ) {}

    @Query(() => [objectTypeCls], { name: plural })
    async findMany(): Promise<T[]> {
      return this.service.findMany()
    }

    @Query(() => objectTypeCls, { name: suffix })
    async findOne(@Args('id') id: string): Promise<T> {
      return this.service.findOne(id)
    }

    @Mutation(() => objectTypeCls, { name: `create${upperFirst(suffix)}` })
    async create(@Args({ name: 'input', type: () => createInputCls }) input: string): Promise<T> {
      return this.service.create(input)
    }

    @Mutation(() => objectTypeCls, { name: `update${upperFirst(suffix)}` })
    async update(
      @Args('id') id: string,
      @Args({ name: 'input', type: () => updateInputCls }) input: string,
    ) {
      return this.service.update(id, input)
    }

    @Mutation(() => Boolean, { name: `delete${upperFirst(suffix)}` })
    async delete(@Args('id') id: string) {
      return this.service.delete(id)
    }
  }

  return BaseResolver
}
