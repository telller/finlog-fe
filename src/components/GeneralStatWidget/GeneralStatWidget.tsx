import { Card, Col, Row, Statistic } from 'antd';
import { useGeneralStatState } from '@src/state';

const GeneralStatWidget = () => {
  const { generalStat } = useGeneralStatState();
  return (
    <Row gutter={16}>
      <Col span={6}>
        <Card>
          <Statistic title="Всього" value={generalStat.total} suffix="₴" />
        </Card>
      </Col>

      <Col span={6}>
        <Card>
          <Statistic
            value={generalStat.averagePerDay}
            title="В середньому / день"
            precision={0}
            suffix="₴"
          />
        </Card>
      </Col>

      <Col span={6}>
        <Card>
          <Statistic title="Середня витрата" value={generalStat.average} precision={0} suffix="₴" />
        </Card>
      </Col>

      <Col span={6}>
        <Card>
          <Statistic title="Транзакцій" value={generalStat.transactions} />
        </Card>
      </Col>
    </Row>
  );
};

export default GeneralStatWidget;
