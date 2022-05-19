type AnimatedCatsProps = {
  catHead: string;
  className: string;
};

const AnimatedCats = ({ catHead, className }: AnimatedCatsProps) => {
  return (
    <div className={className}>
      {[...Array(10)].map((_, idx) => (
        <img key={idx} src={catHead} className="App-logo" alt="logo" />
      ))}
    </div>
  );
};

export default AnimatedCats;
