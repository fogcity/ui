/** @jsxImportSource @emotion/react */
import { useState } from 'react';
import { Theme } from '../../constants/theme';
import { useTheme, css } from '@emotion/react';
import { RadioGroupContext } from './group-context';

type RadioValue = string | number;

type CheckBoxGroupProps = {
  co?: ((theme: Theme) => React.CSSProperties) | React.CSSProperties;
  value?: RadioValue | null;
  onChange?: (val: RadioValue) => void;
  defaultValue?: RadioValue | null;
  disabled?: boolean;
  children: any;
};

const RadioGroup = ({ disabled = false, onChange, children, value, co }: CheckBoxGroupProps) => {
  const theme = useTheme() as Theme;
  const [isValue, setValue] = useState(value);
  const style = css({
    display: 'flex',
    alignItems: 'center',
    flexWrap: 'wrap',
    ...(typeof co == 'function' && co(theme)),
  });
  if (isValue) {
    onChange?.(isValue);
  }
  return (
    <RadioGroupContext.Provider
      value={{
        value: value == null ? [] : [value],
        check: v => {
          setValue(v);
        },
        uncheck: () => {},
        disabled: disabled,
      }}>
      {children}
    </RadioGroupContext.Provider>
  );
};

export default RadioGroup;