import { type InsertionTarget } from 'styled-components/dist/types';
import { SidePanel } from '$/components/SidePanel/SidePanel';
import { Providers } from "$/components/Providers/Providers";
import { useEffect, useState } from "react";
import { groupBy, sortBy, map } from "es-toolkit/compat";
import { StyledTag } from "$/entrypoints/App.styled";

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

const methodsColorMap = {
  GET: '#61affe',
  PATCH: '#50e3c2',
  POST: '#49cc90',
  PUT: '#fca130',
  DELETE: '#f93e3e',
};

const Content = () => {
  const [operations, setOperations] = useState<{ id: string; method: keyof typeof methodsColorMap; path: string; section: string; }[]>([]);

  useEffect(() => {
    const operationElements = [...document.querySelectorAll(".opblock")].map(x => ({
      id: x.id,
      section: x.closest('.opblock-tag-section')!.querySelector('h3')!.textContent,
      method: x.querySelector('.opblock-summary-method')!.textContent as keyof typeof methodsColorMap,
      path: x.querySelector('.opblock-summary-path')!.getAttribute('data-path')!,
    }));
    setOperations(operationElements)
  }, []);

  const operationsGroupedBySection = groupBy(operations, x => x.section);
  const sectionOperations = map(operationsGroupedBySection, (operations, section) => ({section, operations}));

  return (
    <>
      {sortBy(sectionOperations, x => x.section).map(x => (
        <details key={x.section} open={true}>
          <summary>{x.section}</summary>
          <ul>
            {x.operations.map(x => (
              <li key={x.id}>
                <a href={`#${x.id}`}>
                  <StyledTag style={{background: methodsColorMap[x.method]}}>{x.method}</StyledTag>
                  {x.path}
                </a>
              </li>
            ))}
          </ul>
        </details>
      ))}
    </>
  );
};
