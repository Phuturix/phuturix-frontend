import { useState } from 'react';
import Label from '../Label';

export default function PrecRangeSlider() {
  const [leverage, setLeverage] = useState<string>('');
  return (
    <div className="py-8">
      <div className="flex justify-between items-center text-xs py-2">
        {' '}
        <Label label="Leverage" /> <span>{leverage}</span>
      </div>
      <input
        type="range"
        min={0}
        max="100"
        value={leverage}
        className="range range-xs range-info"
        step="1"
        onChange={e => setLeverage(e.target.value)}
      />
      <div className="flex w-full justify-between px-2 text-xs">
        <span>0</span>
        <span>20</span>
        <span>40</span>
        <span>60</span>
        <span>80</span>
        <span>100</span>
      </div>
    </div>
  );
}
