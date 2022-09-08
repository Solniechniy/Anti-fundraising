/* eslint-disable jsx-a11y/control-has-associated-label */
import styles from './styles';

interface ISelect {
  category: [string, string][],
  title: string,
  setValues: any
}

export default function Select({ category, title, setValues }:ISelect) {
  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { value } = e.target;
    setValues(value);
  };

  return (
    <styles.Container>
      <styles.Title>
        {title}
      </styles.Title>
      <styles.StyledSelect name="select" onChange={handleChange}>
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
