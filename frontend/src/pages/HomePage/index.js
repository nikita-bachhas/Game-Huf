import * as React from 'react';
import { Card } from 'antd';
import { useHistory } from 'react-router-dom';

import './index.css';
import { useAuthStore } from '../../services/zustand/auth';

const HomePage = () => {
  const { userInfo } = useAuthStore();
  const history = useHistory();
  return (
    <div className='container' id='home-container'>
      <div className='info-container'>
        <p className='text'>
          Hi <span className='text-highlight'>{userInfo.username}</span>,
        </p>
        <p className='text'>
          Please select <span className='text-highlight'>view game</span> to
          browse a game to play. You can also select{' '}
          <span className='text-highlight'>create a game</span> to design your
          custom game.
        </p>
        <div className='card-container'>
          <Card
            onClick={() => {
              history.push('/games');
            }}
            className='card'
            hoverable
            cover={
              <div className='cover'>
                <img className='cover-image' alt='game' src='./game.png' />
              </div>
            }
          >
            <div className='card-description'>View Games</div>
          </Card>
          <Card
            onClick={() => {
              history.push('/gamecreation');
            }}
            className='card'
            hoverable
            cover={
              <div className='cover'>
                <img
                  className='cover-image'
                  alt='game'
                  src='./create-game.png'
                />
              </div>
            }
          >
            <div className='card-description'>Create a Game</div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
