import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { getPriceHistory, getProductById } from '../services/api';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { formatCurrency } from '../lib/utils';

export default function ProductDetailPage() {
  const { id } = useParams<{ id: string }>();
  const productId = Number(id);

  const { data: product, isLoading: isLoadingProduct } = useQuery({
    queryKey: ['product', productId],
    queryFn: () => getProductById(productId),
    enabled: !!productId,
  });

  const { data: priceHistory, isLoading: isLoadingPriceHistory } = useQuery({
    queryKey: ['priceHistory', productId],
    queryFn: () => getPriceHistory(productId),
    enabled: !!productId,
  });

  if (isLoadingProduct || isLoadingPriceHistory) return <p>Carregando...</p>;

  const formattedPriceHistory = priceHistory?.map(price => ({
    ...price,
    date: new Date(price.date).toLocaleDateString('pt-BR'),
    price: parseFloat(price.price)
  }));

  return (
    <div>
      <h1 className="text-3xl font-bold mb-4">{product?.name}</h1>
      <div className="h-96 mb-8">
        <ResponsiveContainer width="100%" height="100%">
            <LineChart data={formattedPriceHistory}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis tickFormatter={(value) => formatCurrency(value)} />
            <Tooltip formatter={(value: number) => formatCurrency(value)} />
            <Legend />
            <Line type="monotone" dataKey="price" stroke="#8884d8" activeDot={{ r: 8 }} name="Preço" />
            </LineChart>
        </ResponsiveContainer>
      </div>
      <div>
        <h2 className="text-2xl font-semibold mb-2">Histórico de Preços</h2>
        <ul>
          {formattedPriceHistory?.map(price => (
            <li key={price.id} className="flex justify-between p-2 border-b">
              <span>{price.date}</span>
              <span className="font-semibold">{formatCurrency(price.price)}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}