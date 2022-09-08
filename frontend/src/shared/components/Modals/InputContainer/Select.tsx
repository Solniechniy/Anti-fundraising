/* eslint-disable jsx-a11y/control-has-associated-label */
import styles from './styles';

interface ISelect {
  category: [string, string][],
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
        {category.map(([value, name]) => (
          <option key={value} value={value}>
            {name}
          </option>
        ))}
      </styles.StyledSelect>
      <styles.Arrow />
    </styles.Container>
  );
}
