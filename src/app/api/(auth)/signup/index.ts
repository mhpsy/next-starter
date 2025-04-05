/**
 * register
 * @param req
 * @returns
 */
export async function register(req: Request) {
  const { email, password } = await req.json()

  return new Response('Hello, world!')
}
