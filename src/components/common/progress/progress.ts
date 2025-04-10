import { useInterval } from '@/hooks/use-interval'
import {
  useSpring,
} from 'framer-motion'
import {
  createContext,
  useContext,
  useEffect,
  useOptimistic,
} from 'react'

/**
 * Internal context for the progress bar.
 */
export const ProgressBarContext = createContext<ReturnType<typeof useProgressInternal> | null>(
  null,
)

/**
 * Reads the progress bar context.
 */
export function useProgressBarContext() {
  const progress = useContext(ProgressBarContext)

  if (progress === null) {
    throw new Error('Make sure to use `ProgressBarProvider` before using the progress bar.')
  }

  return progress
}

function random(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min
}

/**
 * This function calculates a difference (`diff`) based on the input number (`current`).
 *
 * - If `current` is exactly 0, `diff` is set to 15.
 * - If `current` is less than 50 (but not 0), `diff` is set to a random number between 1 and 10.
 * - If `current` is 50 or more, `diff` is set to a random number between 1 and 5.
 */
function getDiff(
  /** The current number used to calculate the difference. */
  current: number,
): number {
  let diff
  if (current === 0) {
    diff = 15
  }
  else if (current < 50) {
    diff = random(1, 10)
  }
  else {
    diff = random(1, 5)
  }

  return diff
}

/**
 * Custom hook for managing progress state and animation.
 * @returns An object containing the current state, spring animation, and functions to start and complete the progress.
 */
export function useProgressInternal() {
  const [loading, setLoading] = useOptimistic(false)

  const spring = useSpring(0, {
    damping: 25,
    mass: 0.5,
    stiffness: 300,
    restDelta: 0.1,
  })

  useInterval(
    () => {
      // If we start progress but the bar is currently complete, reset it first.
      if (spring.get() === 100) {
        spring.jump(0)
      }

      const current = spring.get()
      spring.set(Math.min(current + getDiff(current), 99))
    },
    loading ? 750 : null,
  )

  useEffect(() => {
    if (!loading) {
      spring.jump(0)
    }
  }, [spring, loading])

  /**
   * Start the progress.
   */
  function start() {
    setLoading(true)
  }

  return { loading, spring, start }
}

export type StartProgress = () => void
/**
 * A custom hook that returns a function to start the progress. Call the start function in a transition to track it.
 *
 * @returns The function to start the progress. Call this function in a transition to track it.
 */
export function useProgress(): StartProgress {
  const progress = useProgressBarContext()

  const startProgress: StartProgress = () => {
    progress.start()
  }
  return startProgress
}
