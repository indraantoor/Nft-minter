interface IBalance {
  balance: number | string;
  currency?: string;
}

const Balance = ({ balance = 0, currency = 'BNB' }: IBalance) => {
  return (
    <div>
      <span>Balance: </span>
      <span>
        {balance}
        {` ${currency}`}
      </span>
    </div>
  );
};

export default Balance;
