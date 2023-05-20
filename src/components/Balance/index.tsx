interface IBalancePropsType {
  balance: number | string;
  currency?: string;
}

const Balance = ({ balance = 0, currency = 'BNB' }: IBalancePropsType) => {
  return (
    <div>
      <span className="font-[700]">Balance: </span>
      <span className="font-[300]">
        {balance}
        <span className="mr-2 font-[600]">{` ${currency}`}</span>
      </span>
    </div>
  );
};

export default Balance;
