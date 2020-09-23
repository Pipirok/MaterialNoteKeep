import React from 'react';
import { Provider } from 'react-redux';

import './main.css';
import { createMuiTheme, ThemeProvider, CssBaseline, Grid } from '@material-ui/core';


import store from './store';
import { loadUser } from './actions/authActions';

import Navbar from './components/Navbar';
import ItemList from './components/ItemList';
import { deepPurple, green } from '@material-ui/core/colors';
import ItemForm from './components/ItemForm';


const theme = createMuiTheme({
  palette: {
    type: 'dark',
    //danger: red,
    primary: deepPurple,
    secondary: green
  }
})

export default class App extends React.Component {

  componentDidMount() {
    store.dispatch(loadUser())
  }

  render() {
    return (
      <Provider store={store}>
       <ThemeProvider theme={theme}>
          <CssBaseline/>
          <Grid container>
            <Navbar/>
            <Grid item xs={false} sm={2} />
            <Grid item xs={12} sm={8}>
              <ItemList/>
            </Grid>
            <Grid item xs={false} sm={2}/>
          </Grid>
          <ItemForm/>
        </ThemeProvider>
     </Provider>
    )
  }


}
