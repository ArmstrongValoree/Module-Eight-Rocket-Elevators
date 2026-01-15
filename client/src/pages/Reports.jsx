import { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Spinner } from 'react-bootstrap';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';
import { Bar, Line } from 'react-chartjs-2';

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

function Reports() {
  const [loading, setLoading] = useState(true);
  const [agentBarData, setAgentBarData] = useState(null);
  const [transactionLineData, setTransactionLineData] = useState(null);

  useEffect(() => {
    fetchReportData();
  }, []);

  const fetchReportData = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/report-data`);
      const data = await response.json();

      if (data.status === 'ok') {
        // Prepare bar chart data
        const barChartData = {
          labels: data.data.agent_bar_data.map(item => item.agent),
          datasets: [
            {
              label: 'Total Transaction Amount',
              data: data.data.agent_bar_data.map(item => item.total),
              backgroundColor: 'rgba(54, 162, 235, 0.6)',
              borderColor: 'rgba(54, 162, 235, 1)',
              borderWidth: 1
            }
          ]
        };

        // Prepare line chart data
        const lineChartData = {
          labels: data.data.transaction_line_data.map(item => {
            const date = new Date(item.date);
            return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
          }),
          datasets: [
            {
              label: 'Daily Transaction Total',
              data: data.data.transaction_line_data.map(item => item.total),
              borderColor: 'rgba(75, 192, 192, 1)',
              backgroundColor: 'rgba(75, 192, 192, 0.2)',
              tension: 0.4,
              fill: true
            }
          ]
        };

        setAgentBarData(barChartData);
        setTransactionLineData(lineChartData);
      }
    } catch (error) {
      console.error('Error fetching report data:', error);
    } finally {
      setLoading(false);
    }
  };

  const barOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Total Transaction Amount by Agent',
        font: {
          size: 16
        }
      },
      tooltip: {
        callbacks: {
          label: function(context) {
            return new Intl.NumberFormat('en-US', {
              style: 'currency',
              currency: 'USD'
            }).format(context.parsed.y);
          }
        }
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          callback: function(value) {
            return '$' + value.toLocaleString();
          }
        }
      }
    }
  };

  const lineOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Daily Transaction Totals (Past 2 Weeks)',
        font: {
          size: 16
        }
      },
      tooltip: {
        callbacks: {
          label: function(context) {
            return new Intl.NumberFormat('en-US', {
              style: 'currency',
              currency: 'USD'
            }).format(context.parsed.y);
          }
        }
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          callback: function(value) {
            return '$' + value.toLocaleString();
          }
        }
      }
    }
  };

  return (
    <Container className="py-4">
      <h1 className="mb-4">Reports Dashboard</h1>

      {loading ? (
        <div className="text-center py-5">
          <Spinner animation="border" />
          <p className="mt-2">Loading report data...</p>
        </div>
      ) : (
        <>
          {/* Bar Chart */}
          <Row className="mb-4">
            <Col>
              <Card>
                <Card.Body>
                  <div style={{ height: '400px' }}>
                    {agentBarData && <Bar data={agentBarData} options={barOptions} />}
                  </div>
                </Card.Body>
              </Card>
            </Col>
          </Row>

          {/* Line Chart */}
          <Row>
            <Col>
              <Card>
                <Card.Body>
                  <div style={{ height: '400px' }}>
                    {transactionLineData && <Line data={transactionLineData} options={lineOptions} />}
                  </div>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </>
      )}
    </Container>
  );
}

export default Reports;