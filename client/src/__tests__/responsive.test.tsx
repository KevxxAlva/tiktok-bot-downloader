import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import PlatformSelector from '../components/PlatformSelector';
import '@testing-library/jest-dom';

describe('Responsive UI Tests', () => {
  it('PlatformSelector uses flex-wrap for responsiveness', () => {
    // We look for the container having flex-wrap class
    const { container } = render(<PlatformSelector selected="tiktok" onSelect={() => {}} />);
    // Select the div that contains the buttons. Based on code it's the second child of the main div
    // But easier to find by class if we can't reliably predict structure.
    // The component has "flex flex-wrap justify-center gap-3"
    const flexContainer = container.querySelector('.flex-wrap');
    expect(flexContainer).toBeInTheDocument();
  });
});
