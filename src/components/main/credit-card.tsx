export default function CreditCard({
  mask,
  bgColor,
  logo,
  size,
}: {
  mask?: string;
  bgColor?: string;
  logo?: string;
  size?: "large";
}) {
  const logoElement = (
    <img
      className="bg-gray-200 rounded-full"
      src={`data:image/png;base64, ${logo}`}
      width={14}
      height={14}
    />
  );

  return size === "large" ? (
    <div
      className="flex flex-col justify-between p-[5px] w-16 h-10 rounded-sm bg-gray-800"
      style={{ backgroundColor: bgColor }}
    >
      <div>{logo && logoElement}</div>
      {mask && (
        <p className="hidden font-medium text-xs leading-3 text-right font-mono text-gray-200">
          {mask}
        </p>
      )}
    </div>
  ) : (
    <div
      className="flex flex-col justify-center items-center p-[5px] w-8 h-5 rounded-sm bg-gray-800"
      style={{ backgroundColor: bgColor }}
    >
      <div>{logo && logoElement}</div>
    </div>
  );
}
