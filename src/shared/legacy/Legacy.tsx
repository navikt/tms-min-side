import { useLogComposition } from "./useLogComposition";

interface Props {
  url: string;
}

const Legacy = ({ url }: Props) => {
  useLogComposition(url);

  return null;
};

export default Legacy;
