import Label from '../Label';
import CurrencyInfo from './CurrencyInfo';
import CurrencyInput from './CurrencyInput';

interface CurrencyInputGroupProps {
  label: string;
}

export function CurrencyInputGroup({
  label,
}: CurrencyInputGroupProps): JSX.Element | null {
  return (
    <div className="pt-5 relative">
      {/* {!inputValidation.valid && (
        <InputTooltip message={inputValidation.message} />
      )} */}
      <div className="w-full flex content-between">
        <Label label={label} />
        <CurrencyInfo title="Max" currency="XTR" />
      </div>
      <CurrencyInput currency="XTR" />
    </div>
  );
}
