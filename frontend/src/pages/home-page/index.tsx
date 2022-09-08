import { Case, Category } from 'providers/interfaces';
import List from 'shared/components/List';

export default function HomePage(): JSX.Element {
  const internalCases: Case[] = [{
    id: '99933459',
    title: 'Case one',
    description: 'lorem ipsum lorem ipsum',
    category: Category.Terrorism,
    date: new Date(),
    ipfsLink: '',
    addressesIds: [],
  },
  {
    id: '99933460',
    title: 'Case one',
    description: 'lorem ipsum lorem ipsum',
    category: Category.Terrorism,
    date: new Date(),
    ipfsLink: '',
    addressesIds: [],
  }];

  return (
    <List cases={internalCases} />
  );
}
