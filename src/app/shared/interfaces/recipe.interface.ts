export default interface Pecipe {
  title: string,
  description: string,
  photoUrl: string,
  ingredients:string[],
  instructions: string,
  categoryId: string,
  likes: number
}