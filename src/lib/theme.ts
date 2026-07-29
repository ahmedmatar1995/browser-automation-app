import { createServerFn } from '@tanstack/react-start'
import { getCookie, setCookie } from '@tanstack/react-start/server'
import { z } from 'zod'

const postThemeValidator = z.union([z.literal('light'), z.literal('dark')])
export type T = z.infer<typeof postThemeValidator>

const storage_key = '_preferred_theme'

export const getThemeServerFn = createServerFn().handler(
  async () => (getCookie(storage_key) || 'light') as T,
)

export const setThemeServerFn = createServerFn({ method: 'POST' })
  .validator(postThemeValidator)
  .handler(async ({ data }) => setCookie(storage_key, data))
