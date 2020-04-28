export abstract class AbstractService<T, C, U> {
  abstract findMany(): Promise<T[]>
  abstract findOne(id: string): Promise<T>
  abstract create(input: C): Promise<T>
  abstract update(id: string, input: U): Promise<T>
  abstract delete(id: string): Promise<boolean>
}
