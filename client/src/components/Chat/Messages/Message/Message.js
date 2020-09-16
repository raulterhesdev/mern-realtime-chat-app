import React from 'react';

const Message = ({ data, name }) => {
  return (
    <div
      style={{
        backgroundColor: data.name === name ? 'teal' : 'salmon',
        alignSelf: data.name === name ? 'flex-end' : 'flex-start',
      }}
    >
      <div>
        <p>{data.name}</p>
        <p>{data.time}</p>
      </div>
      <p>{data.text}</p>
    </div>
    // <Card
    //   style={{
    //     backgroundColor: data.name === name ? 'teal' : 'salmon',
    //     alignSelf: data.name === name ? 'flex-end' : 'flex-start',
    //   }}
    // >
    //   <Typography>{data.name}</Typography>
    //   <Typography>{data.time}</Typography>
    //   <Typography>{data.text}</Typography>
    // </Card>
    // <Card
    //   background={data.name === name ? 'tintTeal' : 'tintRed'}
    //   alignSelf={data.name === name ? 'flex-end' : 'flex-start'}
    // >
    //   <Pane display='flex'>
    //     <Heading>{data.name}</Heading>
    //     <Text color='muted'>{data.time}</Text>
    //   </Pane>
    //   <Paragraph>{data.text}</Paragraph>
    // </Card>
  );
};

export default Message;
