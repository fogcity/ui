/** @jsxImportSource @emotion/react */

import { Theme } from '../../styles/themes';
import { useTheme, css } from '@emotion/react';
import { Base } from '../props';
import { lighten } from 'polished';
import vars from '../../styles/vars';
type TagProps = Base & {
  outlined?: boolean;
  color?: ((theme: Theme) => string) | string;
  radius?: number;
  hollow?: boolean;
};

/**
 * Tags appear in form fields – mainly in search bars –
 * and are used as an indicator for filtered content.
 * They reflect the input a user types in.
 * Tags can be manipulated by editing the text or deleted by clicking on the x.
 *
 * ```js
 *
 * ```
 * @param outlined (Optional) set style with outlined
 * @param color (Optional) the css property `color`
 * @param hollow (Optional) weather the background hollow out
 * @param radius (Optional) the css property `borderRadius` size
 */
const Tag = ({ outlined = false, radius, color, co, children, ...props }: TagProps) => {
  const theme = useTheme() as Theme;
  const getComputedColor = () =>
    (typeof color == 'function' ? color(theme) : color) ||
    (theme.mode == 'light' ? theme.color.black : theme.color.white);

  const styles = css({
    display: 'inline-flex',
    padding: '0.2em 0.6em',
    borderRadius: radius || (theme ? theme.border.full : vars.radius.full),
    ...(!outlined
      ? {
          background: getComputedColor(),
          color: theme.color.white,
        }
      : {
          border: '1px solid ' + getComputedColor(),
          color: getComputedColor(),
        }),
    ...(co && (typeof co == 'function' ? co(theme) : co)),
  });
  return (
    <span css={styles} {...props}>
      {children}
    </span>
  );
};

export default Tag;
