import * as React from 'react';
import { Card, Tag } from 'antd';

import './index.css';

const GameCard = ({ title, creator, tag, onClick }) => {
  return (
    <Card className='game-card-container' onClick={onClick}>
      <div>
        <h2 className='title'>{title}</h2>
        <p className='creator-info'>Created by {creator}</p>
        <div className='tags-container'>
          <Tag className='tag'>{tag}</Tag>
        </div>
      </div>
    </Card>
  );
};

export { GameCard };
