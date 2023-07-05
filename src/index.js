import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { logJSONData } from './components/shopItemCard/ItemCard.jsx';
import App from './App';
import ErrorPage from './routes/root';
import Details from './components/cardDetails/Details';

async function setupRouter() {
  const phonesData = await logJSONData();
  const routes = [
    {
      path: '/',
      element: <App />,
    },
    ...phonesData.map((phone) => ({
      path: `/${phone.brand}/${phone.id}`,
      element: <Details phone={phone} />,
    })),
    {
      path: '*',
      element: <ErrorPage />,
    },
  ];

  ReactDOM.render(
    <React.StrictMode>
      <Router>
        <Routes>
          {routes.map((route, index) => (
            <Route key={index} path={route.path} element={route.element} />
          ))}
        </Routes>
      </Router>
    </React.StrictMode>,
    document.getElementById('root')
  );
}

setupRouter();