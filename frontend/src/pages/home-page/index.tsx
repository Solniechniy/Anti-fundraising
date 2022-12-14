import { useData } from 'providers/DataProvider';
import List from 'shared/components/List';

export default function HomePage(): JSX.Element {
  const { cases } = useData();
  return (
    <List cases={cases} />
  );
}
