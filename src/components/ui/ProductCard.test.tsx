import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import { ProductCard } from './ProductCard';
import type { ApiProduct } from '@/types';

const mockProduct: ApiProduct = {
  id: 'test-123',
  brand: 'Apple',
  model: 'iPhone 15',
  price: '999',
  imgUrl: 'https://test.com/iphone.jpg',
};

describe('ProductCard Component', () => {
  it('renders correctly with given product data', () => {
    // We wrap it in MemoryRouter because ProductCard uses a React Router <Link>
    render(
      <MemoryRouter>
        <ProductCard product={mockProduct} />
      </MemoryRouter>
    );

    // Verify visual text renders
    expect(screen.getByText('Apple')).toBeInTheDocument();
    expect(screen.getByText('iPhone 15')).toBeInTheDocument();
    
    // Verify the price format contains the euro symbol
    expect(screen.getByText('999€')).toBeInTheDocument();
  });

  it('generates the correct navigation link', () => {
    render(
      <MemoryRouter>
        <ProductCard product={mockProduct} />
      </MemoryRouter>
    );

    const linkElement = screen.getByRole('link');
    expect(linkElement).toHaveAttribute('href', '/product/test-123');
  });

  it('handles missing price gracefully', () => {
    const productWithoutPrice = { ...mockProduct, price: '' };
    
    render(
      <MemoryRouter>
        <ProductCard product={productWithoutPrice} />
      </MemoryRouter>
    );

    expect(screen.getByText('-')).toBeInTheDocument();
  });
});
