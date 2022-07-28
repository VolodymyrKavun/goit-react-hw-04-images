// import PropTypes from 'prop-types';
import { useContext } from 'react';
import { CounterContext } from 'components/App/App';

import { ButtonSt, ContainerBtn } from './Button.styled';

const Button = () => {
  // "UseContext"
  const { onLoadMore } = useContext(CounterContext);

  return (
    <ContainerBtn>
      <ButtonSt onClick={onLoadMore}>Load more</ButtonSt>
    </ContainerBtn>
  );
};

// Button.propTypes = {
//   onClick: PropTypes.func,
// };

export default Button;
