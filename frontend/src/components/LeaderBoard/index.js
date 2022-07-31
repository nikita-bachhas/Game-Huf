import React from 'react';
import { List, Avatar } from 'antd';

import './index.css';

const LeaderBoard = ({ data, isLoading }) => {
  return (
    <div>
      <div id='lb-header'>
        <span className='lb-header-label'>Rank</span>
        <span className='lb-header-label'>Name</span>
        <span className='lb-header-label'>Score</span>
      </div>
      <List
        size='large'
        loading={isLoading}
        dataSource={data}
        renderItem={(item, index) => (
          <List.Item>
            <div className='lb-item'>
              <span className='lb-item-element'>{index + 1}</span>
              <div className='lb-item-element'>
                <Avatar
                  style={{
                    color: '#f56a00',
                    backgroundColor: '#fde3cf',
                    marginRight: '20px',
                  }}
                >
                  {item.user_id_id__username
                    ? item.user_id_id__username[0].toUpperCase()
                    : 'U'}
                </Avatar>
                <span>{item.user_id_id__username}</span>
              </div>
              <span className='lb-item-element'>{item.score_earned}</span>
            </div>
          </List.Item>
        )}
        footer={null}
      />
    </div>
  );
};

export { LeaderBoard };
