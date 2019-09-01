import React from 'react';
import { Menu, MenuItem, MenuDivider } from '@blueprintjs/core';
import { withRouter } from 'react-router';
import history from '../history';
import URLS from '../urls';

const LeftMenu = ({ location }) => {
  const handleClick = (path) => (e) => {
    e.preventDefault();
    history.push(path)
  };

  return(
    <Menu>
      <MenuItem
        icon="predictive-analysis"
        onClick={handleClick(URLS.INDEX)}
        active={location.pathname === URLS.INDEX}
        text="Schema"
      />
      <MenuItem
        icon="step-chart"
        onClick={handleClick()}
        text="Input layout"
      />
      <MenuItem
        icon="layout-hierarchy"
        onClick={handleClick()}
        text="Hidden Layouts"
      >
        <MenuItem
          icon="timeline-line-chart"
          onClick={handleClick()}
          text="Layouts"
        />
      </MenuItem>
      <MenuItem
        icon="step-chart"
        onClick={handleClick()}
        text="Input layout"
      />
      <MenuItem
        icon="timeline-line-chart"
        onClick={handleClick}
        text="Divergence"
      />
      <MenuDivider />
      <MenuItem
        text="Settings..."
        icon="cog"
        active={location.pathname === URLS.SETTINGS}
        onClick={handleClick(URLS.SETTINGS)}
      />
    </Menu>
  )
};

export default withRouter(LeftMenu);
