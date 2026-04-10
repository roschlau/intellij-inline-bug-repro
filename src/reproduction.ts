import { Observable, of } from 'rxjs'
import { map } from 'rxjs/operators'

export class Reproduction {

  categories$: Observable<ItemCategory[]>

  constructor() {
    const items$: Observable<ItemCategory[]> = of([])
    this.categories$ = items$.pipe(
      map(categories => uniqueArray(categories, it => it[0].name)),
    )
  }
}

// TODO Inline this const
export const uniqueArray = <T>(items: readonly T[], key: (item: T) => unknown): T[] => {
  return uniqBy(items, key)
}

type HeatmapsItemQuery = {
  orga: {
    orgaItemRotation: Array<{
      id: string,
      text: string,
      topics: Array<{ id: string, name: string }>
    }> | null
  } | null
}
type ItemCategory = NonNullable<NonNullable<NonNullable<HeatmapsItemQuery['orga']>['orgaItemRotation']>[0]['topics']>

export const uniqBy = <T>(items: readonly T[], key: keyof T | ((item: T) => unknown)): T[] => {
  const result: T[] = []
  const seen = new Set<unknown>()
  for (const item of items) {
    const resolvedKey = resolveKey(item, key)
    if (seen.has(resolvedKey)) {
      continue
    }
    seen.add(resolvedKey)
    result.push(item)
  }
  return result
}

const resolveKey = <T>(item: T, key: keyof T | ((item: T) => unknown)): unknown => {
  if (typeof key === 'function') {
    return key(item)
  }
  return item[key]
}
