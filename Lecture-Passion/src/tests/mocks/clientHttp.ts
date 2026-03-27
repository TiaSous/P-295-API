import { vi } from 'vitest';

const clientHttpMock = {
  get: vi.fn(),
  post: vi.fn(),
  put: vi.fn(),
  delete: vi.fn(),
};

export default clientHttpMock;
