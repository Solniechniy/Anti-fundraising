/* eslint-disable jsx-a11y/control-has-associated-label */
import { Category, CategoryMap } from 'providers/interfaces';

import styles from './styles';

interface ISelect {
  category: string[],
  title: string,
  handleChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}

export default function Select({ category, title, handleChange }:ISelect) {
  return (
    <styles.Container>
      <styles.Title>
        {title}
      </styles.Title>
      <styles.StyledSelect
        name="category"
        onChange={handleChange}
      >
        <option value="" />
        {category.map((el) => (
          <option key={el} value={el}>
            {CategoryMap[el as Category]}
          </option>
        ))}
      </styles.StyledSelect>
      <styles.Arrow />
    </styles.Container>
  );
}
