import { Link } from "react-router-dom";
import "./dashboard.css";

function Dashboard() {
  const user = JSON.parse(localStorage.getItem("user") || "null");

  const history = JSON.parse(
    localStorage.getItem("predictionHistory") || "[]"
  );

  const userName = user?.name || "User";

  const recentPredictions = history.slice(0, 3);

  return (
    <main className="dashboard-page">
      <div className="dashboard-container">

        {/* Welcome */}
        <section className="dashboard-welcome">
          <div>
            <span className="dashboard-label">MEDIPREDICT DASHBOARD</span>

            <h1>
              Welcome back, <span>{userName}</span> 👋
            </h1>

            <p>
              Monitor your health predictions and start a new symptom
              analysis whenever you need.
            </p>
          </div>

          <Link to="/prediction" className="dashboard-primary-btn">
            + New Prediction
          </Link>
        </section>

        {/* Statistics */}
        <section className="dashboard-stats">

          <div className="stat-card">
            <div className="stat-icon blue">🩺</div>
            <div>
              <span>Total Predictions</span>
              <strong>{history.length}</strong>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon green">✓</div>
            <div>
              <span>Analyses Completed</span>
              <strong>{history.length}</strong>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon purple">📊</div>
            <div>
              <span>Average Confidence</span>
              <strong>
                {history.length > 0
                  ? Math.round(
                      history.reduce(
                        (total, item) => total + Number(item.confidence || 0),
                        0
                      ) / history.length
                    )
                  : 0}
                %
              </strong>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon orange">❤️</div>
            <div>
              <span>Health Status</span>
              <strong className="status-text">Active</strong>
            </div>
          </div>

        </section>

        {/* Main Grid */}
        <section className="dashboard-grid">

          {/* Quick Actions */}
          <div className="dashboard-card">

            <div className="card-heading">
              <div>
                <span className="small-label">GET STARTED</span>
                <h2>Quick Actions</h2>
              </div>
            </div>

            <div className="quick-actions">

              <Link to="/prediction" className="quick-action">
                <div className="quick-icon">🩺</div>
                <div>
                  <h3>New Prediction</h3>
                  <p>Analyze your current symptoms</p>
                </div>
                <span>→</span>
              </Link>

              <Link to="/history" className="quick-action">
                <div className="quick-icon">🕘</div>
                <div>
                  <h3>Prediction History</h3>
                  <p>View your previous analyses</p>
                </div>
                <span>→</span>
              </Link>

              <Link to="/" className="quick-action">
                <div className="quick-icon">💡</div>
                <div>
                  <h3>How It Works</h3>
                  <p>Learn about MediPredict</p>
                </div>
                <span>→</span>
              </Link>

            </div>

          </div>

          {/* Health Overview */}
          <div className="dashboard-card health-card">

            <div className="card-heading">
              <div>
                <span className="small-label">OVERVIEW</span>
                <h2>Health Analysis</h2>
              </div>

              <div className="health-status-dot">
                <span></span>
                System Active
              </div>
            </div>

            <div className="health-circle">
              <div>
                <strong>{history.length}</strong>
                <span>Analyses</span>
              </div>
            </div>

            <p className="health-message">
              Keep monitoring your symptoms and use MediPredict whenever
              you need an educational health assessment.
            </p>

          </div>

        </section>

        {/* Recent Predictions */}
        <section className="dashboard-card recent-card">

          <div className="card-heading">

            <div>
              <span className="small-label">ACTIVITY</span>
              <h2>Recent Predictions</h2>
            </div>

            <Link to="/history" className="view-all">
              View All →
            </Link>

          </div>

          {recentPredictions.length === 0 ? (

            <div className="empty-dashboard">

              <div className="empty-dashboard-icon">🩺</div>

              <h3>No predictions yet</h3>

              <p>
                Start your first symptom analysis to see your results here.
              </p>

              <Link to="/prediction" className="dashboard-primary-btn">
                Start Prediction
              </Link>

            </div>

          ) : (

            <div className="recent-list">

              {recentPredictions.map((item) => (

                <div className="recent-item" key={item.id}>

                  <div className="recent-icon">✓</div>

                  <div className="recent-info">
                    <h3>{item.disease}</h3>

                    <p>
                      {item.symptoms?.length || 0} symptoms analyzed
                    </p>
                  </div>

                  <div className="recent-confidence">
                    <strong>{item.confidence}%</strong>
                    <span>confidence</span>
                  </div>

                  <div className="recent-date">
                    {item.date}
                  </div>

                </div>

              ))}

            </div>

          )}

        </section>

        {/* Information */}
        <section className="dashboard-info">

          <div>
            <span className="info-icon">🔐</span>

            <div>
              <h3>Your information is private</h3>
              <p>
                Your current frontend data is stored locally in your browser.
              </p>
            </div>
          </div>

          <div>
            <span className="info-icon">⚠️</span>

            <div>
              <h3>Educational purpose only</h3>
              <p>
                MediPredict does not replace professional medical advice.
              </p>
            </div>
          </div>

        </section>

      </div>
    </main>
  );
}

export default Dashboard;