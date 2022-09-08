/* eslint-disable jsx-a11y/control-has-associated-label */
import {
  Category, CategoryMap, Chain, ChainMap,
} from 'providers/interfaces';

import styles from './styles';

interface ISelect {
  category: string[],
  title: string,
  handleChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  name: string
}

export default function Select({
  category, title, handleChange, name,
}:ISelect) {
  return (
    <styles.Container>
      <styles.Title>
        {title}
      </styles.Title>
      <styles.StyledSelect
        name={name}
        onChange={handleChange}
      >
        <option value="" />
        {category.map((el) => (
          <option key={el} value={el}>
            {name === 'category'
              ? CategoryMap[el as Category]
              : ChainMap[el as Chain]}
          </option>
        ))}
      </styles.StyledSelect>
      <styles.Arrow />
    </styles.Container>
  );
}
