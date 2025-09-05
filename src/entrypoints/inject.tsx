import { createRoot } from 'react-dom/client';
import { App } from './App';

const injectRoot = () => {
  const reactRoot = document.createElement('div');
  reactRoot.id = 'swagger-ui-quick-navigation-root';
  const shadowRoot = reactRoot.attachShadow({ mode: 'open' });
  const root = createRoot(shadowRoot);
  document.body.prepend(reactRoot);

  root.render(<App shadowRoot={shadowRoot} />);
};

injectRoot();
