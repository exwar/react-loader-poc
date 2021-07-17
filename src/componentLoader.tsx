import React, { Suspense } from 'react';
import ReactDOM from 'react-dom';
import ErrorBoundary from './components/ErrorBoundary';

enum KnownComponents {  
  'm1' = './components/ModuleOne',
  'm2' = './components/ModuleTwo'
}
export default class ComponentLoader {
  constructor() {
    this.findContainers();
  }

  findContainers() {
    const containers = document.querySelectorAll('[data-component]');
    containers.forEach((element) => this.matchContainerToComponent(element));
  }

  matchContainerToComponent(container: Element) {
    const componentPath = (container as HTMLElement).dataset.component;

    if (!componentPath) {
      console.error('Component path is not set for container:', container);
      return false;
    }

    if (!(componentPath in KnownComponents)) {
      console.error('Component path is not one of the known:', componentPath);
      return false;
    }

    this.renderComponentByPath(container, componentPath as unknown as keyof typeof KnownComponents);
  }

  renderComponentByPath(container: Element, componentPath: keyof typeof KnownComponents) {
    const Component = React.lazy(
      () => import(
        /* webpackChunkName: "lazy-" */
        `${KnownComponents[componentPath]}`
      )
    );

    const Loading = <div>Loading Component...</div>;

    ReactDOM.render(
      <ErrorBoundary>
        <Suspense fallback={Loading}>
          <Component />
        </Suspense>
      </ErrorBoundary>,
      container
    );
  }
}
