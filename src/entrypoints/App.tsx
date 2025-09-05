import { type InsertionTarget } from 'styled-components/dist/types';
import { SidePanel } from '$/components/SidePanel/SidePanel';
import { Providers } from "$/components/Providers/Providers";
import { Fragment, useEffect, useState } from "react";
import { groupBy, map } from "es-toolkit/compat";

interface AppProps {
  shadowRoot: InsertionTarget;
}

export const App = (props: AppProps) => (
  <Providers target={props.shadowRoot}>
    <SidePanel>
      <Content />
    </SidePanel>
  </Providers>
);


const Content = () => {
  const [operations, setOperations] = useState<{ id: string; method: string; path: string; section: string; }[]>([]);

  useEffect(() => {
    const operationElements = [...document.querySelectorAll(".opblock")].map(x => ({
      id: x.id,
      section: x.closest('.opblock-tag-section')!.querySelector('h3')!.textContent,
      method: x.querySelector('.opblock-summary-method')!.textContent,
      path: x.querySelector('.opblock-summary-path')!.getAttribute('data-path')!,
    }));
    setOperations(operationElements)
  }, []);

  return (
    <>
      {map(groupBy(operations, x => x.section), (operations, section) => (
        <Fragment key={section}>
          <header>{section}</header>
          <ul>
            {operations.map(x => <li key={x.id}>
              <a href={`#${x.id}`}>{x.method} {x.path}</a>
            </li>)}
          </ul>
        </Fragment>
      ))}
    </>
  );
}
