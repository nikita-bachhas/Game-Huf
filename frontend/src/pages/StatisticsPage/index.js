import * as React from 'react';
import { useParams, useHistory } from 'react-router';
import { Button, message } from 'antd';
import { Link } from 'react-router-dom';
import { LDTable } from '../../components/LDTable';
import { useGameStore } from '../../services/zustand/game';

import './index.css';

//function to include the components needed and display the information for dashboard
const StatisticsPage = () => {
  const { game_id } = useParams();
  const history = useHistory();

  const { fetchDashboard } = useGameStore();

  React.useEffect(() => {
    const fetchData = async () => {
      const currentDashboard = await fetchDashboard(game_id);
      if (currentDashboard) {
        message.error('Failed to fetch dashboard. Contact Admin for support.');
      } else {
        message.success('Successfully fetched latest dashboard');
      }
    };
    fetchData();
  }, [fetchDashboard, game_id]); //need to change this with gameid

  const handleOnClickEditGame = (game_id) => {
    history.push(`/dashboard/editgame/${game_id}`);
  };

  const handleOnClickEditQuiz = (game_id) => {
    history.push(`/dashboard/editquiz/${game_id}`);
  };

  return (
    <div>
      <div className='dashboard-container'>
        <div className='dashboard-header-container'>
          <h1 className='dashboard-heading'>Statistics Page</h1>
        </div>
      </div>

      <div className='info-container'>
        <div className='item'>
          <LDTable /> {/* leader board table component */}
        </div>

        <hr />

        <div className='button'>
          <Button type='primary'>
            {/* internal link to dashboard page */}
            <Link to={'/dashboard'}>Back</Link>
          </Button>

          <Button
            disabled
            type='primary'
            onClick={() => handleOnClickEditGame(game_id)}
          >
            {/* internal link to edit game page */}
            Edit Game
          </Button>

          <Button
            disabled
            type='primary'
            onClick={() => handleOnClickEditQuiz(game_id)}
          >
            {/* internal link to edit quiz page */}
            Edit Quiz
          </Button>
        </div>
      </div>
    </div>
  );
};

export default StatisticsPage;
