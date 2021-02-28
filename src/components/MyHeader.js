import React from 'react';
import {Container, Header, Left, Body, Right, Title, Icon} from 'native-base';
export const MyHeader = (props) => {
  const {title, back} = props;
  return (
    <Header
      androidStatusBarColor="#ff6347"
      style={{backgroundColor: '#ff6347'}}>
      {back ? (
        <Left>
          <Icon
            style={{color: '#fff', fontSize: 22}}
            name="arrow-back"
            type="MaterialIcons"
            onPress={() => back()}
          />
        </Left>
      ) : (
        <Left />
      )}
      <Body>
        <Title>{title}</Title>
      </Body>
      <Right />
    </Header>
  );
};

export default MyHeader;
