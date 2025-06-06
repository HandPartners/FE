interface BGTopProps {
  testBenner: string;
}

const BGTop = ({ testBenner }: BGTopProps) => {
  return (
    <div className="relative w-screen mt-[20px] md:mt-[40px] min-w-[393px] md:min-w-[1280px]">
      <img
        src={testBenner}
        alt="배너"
        className="object-cover w-full h-[200px] md:h-[500px] bg-top bg-no-repeat "
      />
    </div>
  );
};

export default BGTop;
