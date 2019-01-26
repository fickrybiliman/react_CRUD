import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import Home from '../pages/Home';
import Konstituen from '../pages/konstituen/Index';
import KonstituenCreate from '../pages/konstituen/Create';
import KonstituenEdit from '../pages/konstituen/Edit';
import Login from '../pages/Login';

const ContainerRoutes = () => {
   return (
      <div className = "container">
         <Route path = '/' exact component = { Home } />
         <Route path = '/login' exact component = { Login } />
         <Route path = '/konstituen' exact component = { Konstituen } />
         <Route path = '/konstituen/create' exact component = { KonstituenCreate } />
         <Route path = '/konstituen/edit/:id' exact component = { KonstituenEdit } />
      </div>
   )
}

export default ContainerRoutes;