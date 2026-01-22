import styled from 'styled-components';
import { themeGet } from '@styled-system/theme-get';

const FieldWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  margin-bottom: 15px;
`;

const Heading = styled.div`
  font-family: ${themeGet('fontFamily.heading', 'sans-serif')};
  font-size: ${themeGet('fontSizes.md', '19')}px;
  font-weight: ${themeGet('fontWeights.bold', '700')};
  color: ${themeGet('colors.text.bold', '#0D1136')};
  margin-bottom: 15px;
`;
// Add a new styled component for the form
const FormContainer = styled.form`
  padding: 24px;
  
  /* Or use theme values if available */
  padding: ${themeGet('space.3', '24px')};
  
  /* For responsive design */
  @media (max-width: 768px) {
    padding: 16px;
  }
`;

export { FieldWrapper, Heading, FormContainer };