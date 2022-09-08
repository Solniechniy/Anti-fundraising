import styles from './styles';

interface IInputContainer {
  value: string;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  title: string;
}
export default function InputContainer({
  value,
  handleChange,
  title,
}:IInputContainer) {
  return (
    <styles.Container>
      <styles.Title>
        {title}
      </styles.Title>
      <styles.StyledInput
        value={value}
        onChange={handleChange}
        name="caseName"
      />
    </styles.Container>
  );
}
