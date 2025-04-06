interface ResOption {
  message?: string
  errorMessage?: string
}

export interface ApiResponse<T> {
  ok: boolean
  message: string
  data?: T
  error?: any
  time: number
}

/**
 * server action response wrapper
 * @param runFn execute function
 * @param options options
 * @returns standardized response object
 */
export async function CreateServerActionResponese<T>(
  runFn: () => Promise<T>,
  {
    message = 'success',
    errorMessage,
  }: ResOption = {},
): Promise<ApiResponse<T>> {
  try {
    const data = await runFn()
    return {
      ok: true,
      message,
      data,
      time: Date.now(),
    }
  }
  catch (error) {
    console.error('[API Error]', error)
    return {
      ok: false,
      message: errorMessage || 'error',
      error,
      time: Date.now(),
    }
  }
}

/**
 * wrap server action for client use
 * @param fn server action function
 * @param options response options
 * @returns wrapped function
 */
export function withCreateServerActionResponese<P extends any[], R>(
  fn: (...args: P) => Promise<R>,
  options: ResOption = {},
) {
  return async (...args: P): Promise<ApiResponse<R>> => {
    return CreateServerActionResponese(() => fn(...args), options)
  }
}

// create server action use this function
export function createServerAction<P extends any[], R>(
  actionFn: (...args: P) => Promise<R>,
  options: ResOption = {},
) {
  return withCreateServerActionResponese(actionFn, options)
}
