import React from 'react';
import { storiesOf } from '@kadira/storybook';
import { withKnobs } from '@kadira/storybook-addon-knobs';

import <%= componentName %> from './<%= componentName %>';

const DEFAULT_STATE = {
  /* TODO */
};

const <%= lowerComponentName %> = (state = {}) => {
  return (
    <<%= componentName %>
      {...DEFAULT_STATE}
      {...state}
    />
  );
};

storiesOf('<<%= componentName %> />', module)
  .addDecorator(withKnobs)
  .addWithInfo(
    'default',
    `
      The <%= originalName %> component
    `,
    () => {
      const state = {
        /* TODO */
      };

      return <%= lowerComponentName %>(state);
    },
    { inline: true }
  );
