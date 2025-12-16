import { Spinner } from '../ui/spinner';

export const Loading = () => {
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        width: '100vw',
      }}
    >
      <Spinner height={100} width={100} />
    </div>
  );
};
