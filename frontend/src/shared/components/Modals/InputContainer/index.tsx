import styles from './styles';

interface IInputContainer {
  value: string;
  setValue: any;
  title: string;
}
export default function InputContainer({
  value,
  setValue,
  title,
}:IInputContainer) {
  return (
    <styles.Container>
      <styles.Title>
        {title}
      </styles.Title>
      <styles.StyledInput
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
    </styles.Container>
  );
}
