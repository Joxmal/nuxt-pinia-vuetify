import PocketBase from 'pocketbase'

export const pb = new PocketBase(useRuntimeConfig().public.POCKETBASE_URL)
