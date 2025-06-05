import { Car } from "@/lib/types"
import { useQuery } from "@tanstack/react-query"

type CarResponse = {
  data: Car[],
  metadata: {
    status: string,
    resultCount: number,
    timestamp: Date
  }
}

export function useCars(id?: number) {
  return useQuery({
    queryKey: id ? ['cars', id] : ['cars'],
    queryFn: async (): Promise<CarResponse> => {
      const response = await fetch('https://api.politiet.no/case/politibiler')
      const data: CarResponse = await response.json()

      if (id) {
        const car = data.data.find(car => car.id === id)
        if (car) {
          return { data: [car], metadata: data.metadata }
        }
        throw new Error(`Car with id ${id} not found`)
      }

      return data
    },
  })
}
