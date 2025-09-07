import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { getMinRecentPrices } from '../../services/api';
import { Link } from 'react-router-dom';
import { formatCurrency } from '../../lib/utils';
import styles from './styles.module.css';

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
    <div className={styles.container}>
      <h1 className={styles.title}>Painel</h1>
      <div className={styles.controls}>
        <input
          type="text"
          placeholder="Buscar produtos..."
          className={styles.searchInput}
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
        />
        <div className={styles.daysControl}>
          <label htmlFor="days" className={styles.daysLabel}>Dias:</label>
          <input
            id="days"
            type="number"
            value={days}
            onChange={e => setDays(Number(e.target.value))}
            className={styles.daysInput}
          />
        </div>
      </div>
      {isLoading && <p className={styles.loading}>Carregando...</p>}
      {error && <p className={styles.error}>Erro ao buscar dados</p>}
      <div className={styles.productGrid}>
        {filteredData?.map(item => (
          <div key={item.product_id} className={styles.productCard}>
            <h2 className={styles.productName}>{item.product_name}</h2>
            <p className={styles.productPrice}>{formatCurrency(item.min_price)}</p>
            <p className={styles.productDate}>em {new Date(item.min_date).toLocaleDateString('pt-BR')}</p>
            <Link to={`/product/${item.product_id}`} className={styles.productLink}>
              Ver Histórico
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
