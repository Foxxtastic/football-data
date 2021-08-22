import 'antd/dist/antd.css';
import './App.css';
import { Link, Route, Switch, useLocation } from 'react-router-dom';
import { useAppSelector } from './app/hooks';
import { CompetitionListPage } from './components/CompetitionListPage';
import { MatchDetailsPage } from './components/MatchDetailsPage';
import { MatchListPage } from './components/MatchListPage';
import { Menu, notification } from 'antd';
import { useEffect } from 'react';
import { selectErrorMessage } from './features/errorMessage/errorMessageSlice';
import Layout, { Content, Footer, Header } from 'antd/lib/layout/layout';
import { AboutPage } from './components/AboutPage';

function App() {
  const errorMessage = useAppSelector(selectErrorMessage);
  const { pathname } = useLocation();

  useEffect(() => {
    if (errorMessage !== undefined) {
      notification.error({
        message: "Error",
        description: errorMessage,
      });
    }
  }, [errorMessage])

  return (
    <Layout className="layout">
      <Header>
        <Menu theme="dark" mode="horizontal" selectedKeys={pathname === '/about' ? ['About'] : ['Competitions']}>
          <Menu.Item key='Competitions'><Link to={"/"}>Competitions</Link></Menu.Item>
          <Menu.Item key='About'><Link to={"/about"}>About</Link></Menu.Item>
        </Menu>
      </Header>
      <Content style={{ padding: '20px 50px' }}>
        <Switch>
          <Route path="/" exact component={CompetitionListPage} />
          <Route path="/about" exact component={AboutPage} />
          <Route path="/:competition" exact component={MatchListPage} />
          <Route path="/:competition/:id" exact component={MatchDetailsPage} />
        </Switch>
      </Content>
      <Footer style={{ textAlign: 'center' }}>Football Api Frontend by Viktor Fórizs</Footer>
    </Layout>
  );
}

export default App;
