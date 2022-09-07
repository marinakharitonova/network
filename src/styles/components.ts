import {theme} from './theme';
import styled from 'styled-components';
import {purple} from '@ant-design/colors';

export const Container = styled.div`
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;

  // @media ${theme.media.lg} {
  //   max-width: 960px;
  // }
  // @media ${theme.media.md} {
  //   max-width: 720px;
  // }
`;

export const HeaderTemplate = styled.div`
  height: auto;
  padding: 36px 0;
  background: ${purple.at(-1)};
  line-height: inherit;
`
