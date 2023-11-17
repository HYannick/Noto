import {ContainerProvider} from '@/primary/common/ContainerProvider.tsx';
import {render} from '@testing-library/react';
import {mockContainer} from '@tests/fixtures/common.mocks.ts';
import '@testing-library/jest-dom';
import {useContainer} from '@/domain/hooks/UseContainer.ts';

const MockChildComponent = () => {
  const container = useContainer();
  return <div>{container.registry.dummyText}</div>;
};

describe('useContainer hook', () => {
  it('should throw an error if no container found', () => {
    const originalError = console.error;
    console.error = vi.fn();
    expect(() => render(<MockChildComponent/>)).toThrow('Container not found. Make sure to wrap your components with a ContainerProvider.');
    console.error = originalError;
  });

  it('returns the container when within ContainerProvider', () => {
    const container = mockContainer({
      registry: {
        dummyText: 'Kusanagi'
      }
    });

    const {getByText} = render(
      <ContainerProvider container={container}>
        <MockChildComponent/>
      </ContainerProvider>
    );

    expect(getByText('Kusanagi')).toBeInTheDocument();
  });

});