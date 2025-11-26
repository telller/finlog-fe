import { Typography } from 'antd';
import { useState } from 'react';

interface TruncatedTextProps {
  text: string;
}

const TruncatedText = ({ text }: TruncatedTextProps) => {
  const [showFull, setShowFull] = useState(false);

  const isTruncated = text.length > 50;
  const displayText = showFull || !isTruncated ? text : text.slice(0, 10) + '...';

  return (
    <Typography.Text>
      {displayText}
      <br />
      {isTruncated && (
        <span style={{ color: '#7FB3D5' }} onClick={() => setShowFull(!showFull)}>
          {showFull ? 'менше' : 'більше'}
        </span>
      )}
    </Typography.Text>
  );
};

export default TruncatedText;
