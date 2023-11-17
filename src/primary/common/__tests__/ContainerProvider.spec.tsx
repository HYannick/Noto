import {describe, it, expect} from 'vitest';
import { render } from '@testing-library/react';
import { useContext } from 'react';
import '@testing-library/jest-dom';
import {ContainerContext, ContainerProvider} from '@/primary/common/ContainerProvider.tsx';
import {mockContainer} from '@tests/fixtures/common.mocks.ts';
const MockChildComponent = () => {
  const context = useContext(ContainerContext) as any;
  return <div>{context.registry.dummyText}</div>;
};

describe('ContainerProvider', () => {
  it('provides the container context to children', () => {
    const container = mockContainer({
      registry: {
        dummyText: 'Kusanagi'
      }
    });

    const { getByText } = render(
      <ContainerProvider container={container}>
        <MockChildComponent />
      </ContainerProvider>
    );

    // Assert that the child component receives the container context
    expect(getByText('Kusanagi')).toBeInTheDocument();
  });
});