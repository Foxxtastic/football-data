import { BrowserRouter as Router, Link, Route, Switch } from 'react-router-dom';
import './App.css';
import { useAppSelector } from './app/hooks';
import { CompetitionList } from './components/CompetitionList';
import { MatchDetails } from './components/MatchDetails';
import { MatchList } from './components/MatchList';
import { selectBreadcrumb } from './features/breadcrumb/breadcrumbSlice';

function App() {
  const breadcrumb = useAppSelector(selectBreadcrumb);

  return (
    <Router>
      {breadcrumb.length !== 0 &&
        <div>
          {breadcrumb.map((_, idx) => <Link key={idx} to={_.link}>{_.text} / </Link>)}
        </div>}
      <Switch>
        <Route path="/" exact>
          <CompetitionList />
        </Route>
        <Route path="/:competition" exact>
          <MatchList />
        </Route>
        <Route path="/:competition/:id" exact>
          <MatchDetails />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
