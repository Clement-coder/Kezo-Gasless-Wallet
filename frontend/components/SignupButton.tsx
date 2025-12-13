import { usePrivy } from '@privy-io/react-auth';

export default function ConnectOrSignupButton() {
  const { login } = usePrivy();

  return (
    <button onClick={login}>
      Connect / Sign Up
    </button>
  );
}
