import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { getMinRecentPrices } from '../services/api';
import { Link } from 'react-router-dom';
import { formatCurrency } from '../lib/utils';

export default function DashboardPage() {
  const [days, setDays] = useState(14);
  const [searchTerm, setSearchTerm] = useState('');

  const { data, isLoading, error } = useQuery({
    queryKey: ['minRecentPrices', days],
    queryFn: () => getMinRecentPrices(days),
  });

  const filteredData = data?.filter(item =>
    item.product_name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <h1 className="text-3xl font-bold mb-4">Painel</h1>
      <div className="flex justify-between mb-4">
        <input
          type="text"
          placeholder="Buscar produtos..."
          className="p-2 border rounded"
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
        />
        <div className="flex items-center">
          <label htmlFor="days" className="mr-2">Dias:</label>
          <input
            id="days"
            type="number"
            value={days}
            onChange={e => setDays(Number(e.target.value))}
            className="p-2 border rounded w-20"
          />
        </div>
      </div>
      {isLoading && <p>Carregando...</p>}
      {error && <p>Erro ao buscar dados</p>}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredData?.map(item => (
          <div key={item.product_id} className="p-4 border rounded shadow">
            <h2 className="text-xl font-semibold">{item.product_name}</h2>
            <p className="text-2xl font-bold text-green-500">{formatCurrency(item.min_price)}</p>
            <p className="text-sm text-gray-500">em {new Date(item.min_date).toLocaleDateString('pt-BR')}</p>
            <Link to={`/product/${item.product_id}`} className="text-blue-500 hover:underline mt-2 inline-block">
              Ver Histórico
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}