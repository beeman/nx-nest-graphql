import { Field, InputType } from '@nestjs/graphql'

@InputType()
export class UpdatePostInput {
  @Field()
  title: string

  @Field()
  content: string
}
