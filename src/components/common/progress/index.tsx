'use client'
import type {
  ReactNode,
} from 'react'
import type { StartProgress } from './progress'
import {
  domAnimation,
  LazyMotion,
  m,
  useMotionTemplate,
} from 'framer-motion'
import React from 'react'
import {
  ProgressBarContext,

  useProgressBarContext,
  useProgress as useProgressHook,
  useProgressInternal,
} from './progress'

/**
 * Provides the progress value to the child components.
 *
 * @param children - The child components to render.
 * @returns The rendered ProgressBarContext.Provider component.
 */
export function ProgressBarProvider({ children }: { children: ReactNode }) {
  const progress = useProgressInternal()
  return <ProgressBarContext value={progress}>{children}</ProgressBarContext>
}

/**
 * Renders a progress bar component.
 *
 * @param className - The CSS class name for the progress bar.
 * @returns The rendered progress bar component.
 */
export function ProgressBar({
  className,
}: {
  className: string
}) {
  const progress = useProgressBarContext()
  const width = useMotionTemplate`${progress.spring}%`

  return (
    <LazyMotion features={domAnimation}>
      {progress.loading && (
        <m.div
          style={{ width }}
          exit={{ opacity: 0 }}
          className={className}
        />
      )}
    </LazyMotion>
  )
}

/**
 * A custom hook that returns a function to start the progress. Call the start function in a transition to track it.
 *
 * @returns The function to start the progress. Call this function in a transition to track it.
 */
export function useProgress(): StartProgress {
  return useProgressHook()
}
