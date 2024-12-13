import React from "react";

export default function PageHeader({
  title,
  icon,
  children,
}: {
  title: string;
  icon: any;
  children?: React.ReactNode;
}) {
  return (
    <div className="flex justify-between mb-12">
      <div className="flex gap-2">
        {React.createElement(icon)}
        <h1 className="text-xl font-semibold">{title}</h1>
      </div>
      {children}
    </div>
  );
}
