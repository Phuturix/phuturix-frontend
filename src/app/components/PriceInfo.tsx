import React from 'react';

export function PriceInfo() {
  const token = 'XTR';

  return (
    <div className="flex flex-wrap justify-between items-center py-2 px-5 h-full max-w-[470px] min-[1026px]:m-auto max-[500px]:py-4 max-[500px]:justify-start">
      <div className="flex flex-col items-start justify-start max-[500px]:pr-5">
        <div className="flex">
          //TODO - update proce
          <p className="text-sm font-bold $text-primary-conten mr-1">
            {0}
          </p>
          <p className="text-sm text-secondary-content"> {token}</p>
        </div>
      </div>
    </div>
  );
}
