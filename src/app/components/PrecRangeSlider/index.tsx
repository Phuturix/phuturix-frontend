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
        max="10"
        value={leverage}
        className="range range-xs range-info"
        step="0.1"
        onChange={e => setLeverage(e.target.value)}
      />
      <div className="flex w-full justify-between px-2 text-xs">
        <span>1x</span>
        <span>2x</span>
        <span>3x</span>
        <span>6x</span>
        <span>8x</span>
        <span>10x</span>
      </div>
    </div>
  );
}
