import { Ref } from "vue"
import { useRoute, LocationQueryRaw } from "vue-router"

interface RouterQuery {
  redirect: Ref<string>
  otherQuery: Ref<LocationQueryRaw | undefined>
}

const useRouteQuery = (): RouterQuery => {
  const route = useRoute()
  const query = route.query
  const redirect = ref("")
  const otherQuery = ref<LocationQueryRaw | undefined>(undefined)

  const getOtherQuery = (query: LocationQueryRaw) => {
    return Object.keys(query || {})
      .filter((q) => q !== "redirect")
      .reduce((obj, key) => {
        obj[key] = query[key]
        return obj
      }, {} as LocationQueryRaw)
  }

  otherQuery.value = getOtherQuery(query)

  watchEffect(() => {
    const query = route.query
    if (query) {
      redirect.value = query.redirect as string
      otherQuery.value = getOtherQuery(query as LocationQueryRaw)
    }
  })

  return {
    redirect,
    otherQuery
  }
}

export default useRouteQuery
