import '@testing-library/jest-dom';

// Polyfill for matchMedia
global.matchMedia = global.matchMedia || function () {
  return {
    matches: false,
    addListener: function () {},
    removeListener: function () {},
  };
};

// Polyfill for ResizeObserver (needed for framer-motion?)
global.ResizeObserver = class ResizeObserver {
  observe() {}
  unobserve() {}
  disconnect() {}
};

// Polyfill for IntersectionObserver
global.IntersectionObserver = class IntersectionObserver {
  root = null;
  rootMargin = '';
  thresholds = [];
  disconnect() { return null; }
  observe() { return null; }
  takeRecords() { return []; }
  unobserve() { return null; }
};
