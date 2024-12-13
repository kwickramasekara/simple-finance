export default function CreditCard({
  mask,
  bgColor,
  logo,
}: {
  mask?: string;
  bgColor?: string;
  logo?: string;
}) {
  return (
    <div
      className="flex flex-col justify-between p-[5px] w-16 h-10 rounded-sm bg-gray-800"
      style={{ backgroundColor: bgColor }}
    >
      <div>
        {logo && (
          <img
            className="bg-gray-200 rounded-full"
            src={`data:image/png;base64, ${logo}`}
            width={14}
            height={14}
          />
        )}
      </div>
      {mask && (
        <p className="font-medium text-xs leading-3 text-right font-mono text-gray-200">
          {mask}
        </p>
      )}
    </div>
  );
}
