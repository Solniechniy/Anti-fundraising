import styles from './styles';

interface ITextArea {
  value: string;
  handleChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  title: string;
  subTitle: string,
}
export default function TextArea({
  value,
  handleChange,
  title,
  subTitle,
}:ITextArea) {
  return (
    <styles.Container>
      <styles.Title>
        {title}
        {subTitle && (<span>{subTitle}</span>)}
      </styles.Title>
      <styles.StyledTextArea
        value={value}
        onChange={handleChange}
        name="description"
      />
    </styles.Container>
  );
}
