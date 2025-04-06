// https://github.com/vercel/next.js/issues/49298#issuecomment-1537433377
// next with throw a error for redirect, but we can't catch it
export function isRedirectError(error: any) {
  return error?.message?.includes('NEXT_REDIRECT')
}
