interface IButton {
  text: string;
  className?: string;
  onClick?: Function;
}

const Button = ({ text, className, onClick }: IButton) => {
  const handleClick = onClick;
  return (
    <button
      className={
        `rounded-full bg-gradient-to-r from-darkPink to-lightPink p-2 text-sm text-white ` +
        className
      }
      onClick={() => {
        if (handleClick) {
          handleClick();
        }
        return;
      }}
    >
      {text}
    </button>
  );
};

export default Button;
