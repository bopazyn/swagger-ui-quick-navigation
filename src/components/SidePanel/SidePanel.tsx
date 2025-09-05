import {type ReactNode, useEffect, useState} from 'react';
import {StyledSidePanel} from './SidePanel.styled';

interface SidePanelProps {
  children?: ReactNode;
}

export const SidePanel = (props: SidePanelProps) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const isSwaggerUiPage = document.querySelector('#swagger-ui') as HTMLElement;
    setIsVisible(isSwaggerUiPage !== null);

    if (isSwaggerUiPage) {
      isSwaggerUiPage.style.width = 'calc(100dvw - 400px - 24px)';
    }
  }, []);

  return isVisible && (
    <StyledSidePanel>
      {props.children}
    </StyledSidePanel>
  );
};
