import './App.css';
import React, { useContext } from 'react';
import LoginModal from './LoginModel'
import SignUpContainer from './Components/SignUpContainer';
import { ApiContext } from './apicontext';
import MembersList from './Components/EmailManagement/Memberslist';
import Newsletter from './Components/EmailManagement/Newsletter';
import NewsletterEditor from './Components/NewletterManagement/NewsletterEditor';
import PendingNewsletters from './Components/NewletterManagement/pending_newsletters';

function App() {

  const { user } = useContext(ApiContext);
  return (
    <div className="App">
      <h1>Welcome to our automated marketing tool</h1>
      { user ? (
        <p>Logged in as User ID: {user}</p>
      ) : (
        <>
          <LoginModal />
          <SignUpContainer />
          <PendingNewsletters />
          <NewsletterEditor />
          <MembersList />
          <Newsletter />
        </>
      )};
    </div>
  );
}

export default App;
