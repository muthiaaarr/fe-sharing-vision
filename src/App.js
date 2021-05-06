import { BrowserRouter, Route, Switch } from "react-router-dom";
import Dashboard from './components/Dashboard'
import Create from './components/Create'
import Delete from './components/Delete'

export default function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path='/' component={Dashboard}></Route>
        <Route exact path='/create' component={Create}></Route>
        <Route exact path='/delete' component={Delete}></Route>
      </Switch>
    </BrowserRouter>
  )
}