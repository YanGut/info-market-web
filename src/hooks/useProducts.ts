
import { useQuery } from '@tanstack/react-query';
import { getProducts } from '../services/api';

export function useProducts(name?: string) {
  return useQuery({
    queryKey: ['products', name],
    queryFn: () => getProducts(name),
    enabled: !!name, // Only run the query if a name is provided
  });
}
