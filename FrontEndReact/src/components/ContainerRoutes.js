import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import Home from '../pages/Home';
import Konstituen from '../pages/konstituen/Index';
import KonstituenCreate from '../pages/konstituen/Create';
import KonstituenEdit from '../pages/konstituen/Edit';

const ContainerRoutes = () => {
   return (
      <div className = "container">
         <Route path = '/' exact component = { Home } />
         <Route path = '/konstituen' exact component = { Konstituen } />
         <Route path = '/konstituen/create' exact component = { KonstituenCreate } />
         <Route path = '/konstituen/edit/:id' exact component = { KonstituenEdit } />
      </div>
   )
}

export default ContainerRoutes;