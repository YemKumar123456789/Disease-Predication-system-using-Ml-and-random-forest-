import { Link } from "react-router-dom";
import { useState } from "react";

function History() {
  const [history, setHistory] = useState(
    JSON.parse(localStorage.getItem("predictionHistory") || "[]")
  );

  const deleteItem = (id) => {
    const updated = history.filter((item) => item.id !== id);

    setHistory(updated);

    localStorage.setItem(
      "predictionHistory",
      JSON.stringify(updated)
    );
  };

  const clearHistory = () => {
    if (window.confirm("Delete all prediction history?")) {
      setHistory([]);
      localStorage.removeItem("predictionHistory");
    }
  };

  return (
    <main className="history-page">

      <div className="history-container">

        <div className="history-heading">

          <div>
            <span className="section-label">
              YOUR ACTIVITY
            </span>

            <h1>Prediction History</h1>

            <p>
              Review your previous frontend prediction results.
            </p>
          </div>

          {history.length > 0 && (
            <button
              className="clear-history-btn"
              onClick={clearHistory}
            >
              Clear History
            </button>
          )}

        </div>


        {history.length === 0 ? (

          <div className="history-empty">

            <div className="empty-symbol">
              ▤
            </div>

            <h2>No prediction history</h2>

            <p>
              Your saved predictions will appear here.
            </p>

            <Link to="/prediction" className="btn primary-btn">
              Make a Prediction →
            </Link>

          </div>

        ) : (

          <div className="history-list">

            {history.map((item) => (

              <div className="history-card" key={item.id}>

                <div className="history-card-top">

                  <div className="history-result-icon">
                    ✓
                  </div>

                  <div className="history-main">

                    <span>ESTIMATED CONDITION</span>

                    <h2>{item.disease}</h2>

                    <small>{item.date}</small>

                  </div>

                  <div className="history-confidence">
                    <strong>{item.confidence}%</strong>
                    <span>confidence</span>
                  </div>

                </div>


                <div className="history-symptoms">

                  {item.symptoms.map((symptom) => (
                    <span key={symptom}>
                      {symptom}
                    </span>
                  ))}

                </div>


                <button
                  className="delete-history"
                  onClick={() => deleteItem(item.id)}
                >
                  Delete
                </button>

              </div>

            ))}

          </div>

        )}

      </div>

    </main>
  );
}

export default History;