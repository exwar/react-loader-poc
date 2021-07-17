import React from 'react';
import styled from 'styled-components';

import { Container } from './Module.styles';

const ModuleTwoText = styled.span`
  color: purple;
`;

const ModuleTwo = () => {
  return (
    <Container>
      <ModuleTwoText>Module Two</ModuleTwoText>
    </Container>
  );
};

export default ModuleTwo;
