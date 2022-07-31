import * as React from 'react';
import { List, Skeleton, message } from 'antd';
import { useHistory } from 'react-router';
import { GameCard } from '../../components';
import { useGameStore } from '../../services/zustand/game';
import { useAuthStore } from '../../services/zustand/auth';
import './index.css';

const DashboardPage = () => {
  
  const history = useHistory();
  const { userInfo } = useAuthStore();
  const { isLoading, fetchUserGames, userGames } = useGameStore();
 

  React.useEffect(() => {
    const fetchData = async () => {
      const errorMessage = await fetchUserGames(userInfo.username);
      if (errorMessage) {
        message.error('Failed to fetch games. Contact Admin for support.');
        message.error(errorMessage);
      } else {
        message.success('Successfully fetched latest games list');
      }
    };
    fetchData();
  }, [fetchUserGames, userInfo.username]);

  console.log(userGames)

  const handleOnClickGameCard = (game_id) => {
    // history.push(`/game/${gameInfo.game_id}/${gameInfo.game_name}`);
    history.push(`/dashboard/statistics/${game_id}`);
  };

  return (
    <div className='game-page-container'>
      <div className='game-page-header-container'>
        <h2 className='game-page-heading'>My Dashboard</h2>
        
      </div>
      <div className='info-container'>
        <p className='text'>
          Hi <span className='text-highlight'>{userInfo.username}</span>, Please
          select the game you wish to view.
        </p>

        <div className='games-container'>
        
          <List
            loading={isLoading}
            grid={{
              gutter: [30, 16],
              column: userGames.length > 3 ? 3 : userGames.length,
            }}
            dataSource={userGames}
            renderItem={(item, index) => (
              <List.Item key={JSON.stringify(item) + index}>
                <Skeleton loading={isLoading} active>
                  <GameCard
                    title={item.game_name}
                    creator={item.username}
                    tag={item.game_tag}
                    onClick={() => handleOnClickGameCard(item.game_id)}
                  />
                </Skeleton>
              </List.Item>
            )}
          />
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
