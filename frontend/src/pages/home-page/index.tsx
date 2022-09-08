import { Case, Category, Status } from 'providers/interfaces';
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
    status: Status.Approved,
  },
  {
    id: '99933460',
    title: 'Case one',
    description: 'lorem ipsum lorem ipsum',
    category: Category.Terrorism,
    date: new Date(),
    ipfsLink: '',
    addressesIds: [],
    status: Status.Pending,

  }];

  return (
    <List cases={internalCases} />
  );
}
