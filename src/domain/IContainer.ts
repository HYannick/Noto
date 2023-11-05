export interface IContainer {
  registry: Record<string, any>;
  resolve: (identifier: string) => any
}