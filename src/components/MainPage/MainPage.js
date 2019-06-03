import React from 'react';
import './MainPage.css';
import Dashboard from '../Dashboard/Dashboard'
import Header from '../Header/Header'
import Sidebar from '../Sidebar/Sidebar';

function MainPage() {
  return (
    <div className="MainPage">
        <header>
            <Header/>
        </header>
        <section className="main-body">
            <Dashboard/>
            <Sidebar/>
        </section>
    </div>
  );
}

export default MainPage;