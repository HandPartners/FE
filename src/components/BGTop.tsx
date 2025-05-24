interface BGTopProps {
  testBenner: string;
}

const BGTop = ({ testBenner }: BGTopProps) => {
  return (
    <div className="relative w-screen mt-[40px]">
      <img
        src={testBenner}
        alt="배너"
        className=" h-[500px] bg-cover  bg-top bg-no-repeat "
      />
    </div>
  );
};

export default BGTop;
