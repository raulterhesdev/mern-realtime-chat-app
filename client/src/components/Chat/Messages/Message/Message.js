import React from 'react';

import { Card, Heading, Paragraph, Pane, Text } from 'evergreen-ui';

const Message = ({ data, name }) => {
  return (
    <Card
      background={data.name === name ? 'tintTeal' : 'tintRed'}
      alignSelf={data.name === name ? 'flex-end' : 'flex-start'}
    >
      <Pane display='flex'>
        <Heading>{data.name}</Heading>
        <Text color='muted'>{data.time}</Text>
      </Pane>
      <Paragraph>{data.text}</Paragraph>
    </Card>
  );
};

export default Message;
