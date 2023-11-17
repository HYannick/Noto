import {renderHook} from '@testing-library/react';
import {RegistryKeys, useInject} from '@/domain/hooks/UseInject.ts';

const container = {
  registry: {
    noteService: 'Kusanagi'
  },
  resolve: vi.fn(),
}

vi.mock('../UseContainer.ts', () => ({
  useContainer: () => container,
}));

describe('useInject hook', () => {
  it('should resolve the right service', () => {
    const identifier: RegistryKeys = 'noteService';
    const dependency = 'testDependency';

    container.resolve.mockReturnValue(dependency);

    const { result } = renderHook(() => useInject(identifier));

    expect(container.resolve).toHaveBeenCalledWith(identifier);
    expect(result.current).toBe(dependency);
  });
});