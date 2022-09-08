import styles from './styles';

interface ITextArea {
  value: string;
  setValue: any;
  title: string;
  subTitle: string,
}
export default function TextArea({
  value,
  setValue,
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
        onChange={(e) => setValue(e.target.value)}
      />
    </styles.Container>
  );
}
