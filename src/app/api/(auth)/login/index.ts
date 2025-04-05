/**
 * login
 * @param req
 * @returns
 */
export async function login(req: Request) {
  const { email, password } = await req.json()

  return new Response('Hello, world!')
}
