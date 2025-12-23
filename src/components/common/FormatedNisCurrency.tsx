interface Props {
  amount: number;
}

export const FormatedNisCurrency = ({ amount }: Props) => {
  const formated = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'ILS',
  }).format(amount);

  return <span className="">{formated}</span>;
};
