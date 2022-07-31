import * as React from 'react';
import { useState } from 'react';
import { Button, Modal } from 'antd';

/* 
Function for use of popup window and its parameters passed

btnName: name of button that will be displayed
title: title of the popup window that appears
desc: text description that will be displayed in the popup window
danger: boolean type. set 'true' if you want the button to be indicated red, else 'false' for blue
*/

const Pop = ({ btnName, title, desc, danger }) => {
  const [isModalVisible, setIsModalVisible] = useState(false);

  //for popup window
  const showModal = () => {
    setIsModalVisible(true);
  };

  //to handle event when 'ok' is selected from popup
  const handleOk = () => {
    setIsModalVisible(false);
  };

  //to handle event when 'cancel' is selected from popup
  const handleCancel = () => {
    setIsModalVisible(false);
  };

  //displays the button to click for popup and its information based on the parameters passed in
  return (
    <>
      <Button type='primary' danger={danger} onClick={showModal}>
        {btnName}
      </Button>
      <Modal
        title={title}
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <p>{desc}</p>
      </Modal>
    </>
  );
};

export { Pop };
