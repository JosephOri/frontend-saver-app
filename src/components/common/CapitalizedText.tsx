interface Props {
  text: string;
}

export const CapitalizedText = ({ text }: Props) => {
  const capitalizedText = `${text[0].toUpperCase()}${text.slice(1)}`;

  return <div>{capitalizedText}</div>;
};
