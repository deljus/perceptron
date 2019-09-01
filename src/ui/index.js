import React from 'react';
import styled from 'styled-components';
import { Switch, Router as BrowserRouter, Route } from 'react-router';
import history from './history';
import store from './store';
import { Provider } from 'react-redux';
import { LeftMenu } from './containers';
import { IndexPage, SettingsPage, InputLayerPage } from './pages';
import URLS from './urls';

const Container = styled.div`
    display: flex;
    height: 100%;
`;

const LeftMenuContainer = styled.div`
    display: flex;
    border-right: 1px solid rgba(16, 22, 26, 0.15);
`;

const PageContainer = styled.div`
    display: flex;
    flex-grow: 1;
    background-color: #f4f8fa;
    padding: 20px;
`;

export default () => (
  <Provider store={store}>
    <BrowserRouter history={history}>
      <Container>
        <LeftMenuContainer>
          <LeftMenu/>
        </LeftMenuContainer>
        <PageContainer>
          <Switch>
            <Route path={URLS.INDEX} component={IndexPage} exact />
            <Route path={URLS.SETTINGS} component={SettingsPage} exact />
            <Route path={URLS.INPUT_LAYER} component={InputLayerPage} exact />
          </Switch>
        </PageContainer>
      </Container>
    </BrowserRouter>
  </Provider>
)
