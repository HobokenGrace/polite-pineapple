import React from 'react';

import Action, { IAction } from './Action';

type CtaButtonsProps = {
  actions: IAction[],
}

const CtaButtons: React.FunctionComponent<CtaButtonsProps> = (props) => {
  const {
    actions = [],
  } = props;
  return (
    <>
      {
        actions.map((action, action_idx) => (
          <Action key={action_idx} {...props} action={action} />
        ))
      }
    </>
  );
};

export default CtaButtons;
