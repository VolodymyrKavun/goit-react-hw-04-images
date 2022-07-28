import { Rings } from 'react-loader-spinner';
import { ContainerBtn } from 'components/Button/Button.styled';

const Loader = () => {
  return (
    <ContainerBtn>
      <Rings color="#00BFFF" height={80} width={80} />
    </ContainerBtn>
  );
};

export default Loader;
