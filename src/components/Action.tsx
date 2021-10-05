import React from 'react';

import { Link, withPrefix, classNames } from '../utils';
import Icon from './Icon';

export interface IAction {
  has_icon: boolean;
  icon?: string;
  icon_position?: string;
  label: string;
  new_window: boolean;
  no_follow: boolean;
  style?: string;
  typeform: boolean;
  url: string;
}

type ActionProps = {
  action: IAction,
}

const Action: React.FunctionComponent<ActionProps> = (props) => {
  const {
    action = {} as IAction,
  } = props;
  const {
    has_icon,
    icon = 'arrow-left',
    icon_position = 'left',
    label,
    new_window,
    no_follow,
    style = 'link',
    typeform,
    url,
  } = action;
  return (
    <Link
      href={withPrefix(url)}
      {...(new_window ? ({ target: '_blank' }) : null)}
      {...(new_window || no_follow ? { rel: `${new_window ? 'noopener ' : ''}${no_follow ? 'nofollow' : ''}` } : null)}
      className={classNames({
        button: (style === 'primary') || (style === 'secondary'),
        secondary: style === 'secondary',
        'has-icon': has_icon,
        'typeform-share': typeform,
      })}
      {...(typeform ? ({
        'data-mode': 'popup',
        'data-size': '100',
      }) : null)}
    >
      {!!has_icon && (
      <Icon {...props} icon={icon} />
      )}
      <span className={classNames({ 'order-first': icon_position === 'right' })}>{label}</span>
    </Link>
  );
};

export default Action;
