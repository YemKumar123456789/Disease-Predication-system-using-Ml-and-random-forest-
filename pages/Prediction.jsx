import { useState } from "react";
import { useNavigate } from "react-router-dom";

const symptoms = [
  "Fever",
  "Headache",
  "Cough",
  "Fatigue",
  "Sore Throat",
  "Runny Nose",
  "Body Ache",
  "Nausea",
  "Vomiting",
  "Stomach Pain",
  "Chest Pain",
  "Shortness of Breath",
  "Dizziness",
  "Joint Pain",
  "Back Pain",
  "Skin Rash",
  "Itching",
  "Abdominal Pain",
  "Loss of Appetite",
  "Weakness",
  "Chills",
  "Diarrhea",
];

function Prediction() {
  const navigate = useNavigate();

  const [selected, setSelected] = useState([]);
  const [search, setSearch] = useState("");
  const [analyzing, setAnalyzing] = useState(false);

  const filteredSymptoms = symptoms.filter((symptom) =>
    symptom.toLowerCase().includes(search.toLowerCase())
  );

  const toggleSymptom = (symptom) => {
    if (selected.includes(symptom)) {
      setSelected(selected.filter((item) => item !== symptom));
    } else {
      setSelected([...selected, symptom]);
    }
  };

  // ==========================================
  // CONNECT TO FLASK ML API
  // ==========================================

  const analyze = async () => {
    if (selected.length === 0) {
      alert("Please select at least one symptom.");
      return;
    }

    setAnalyzing(true);

    try {
      // Send selected symptoms to Python Flask backend
      const response = await fetch("http://127.0.0.1:5000/predict", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          symptoms: selected,
        }),
      });

      const data = await response.json();

      // Check if backend returned an error
      if (!response.ok) {
        throw new Error(data.error || "Prediction failed");
      }

      // Save symptoms
      localStorage.setItem(
        "selectedSymptoms",
        JSON.stringify(selected)
      );

      // Save ML prediction
      localStorage.setItem(
        "predictionResult",
        JSON.stringify(data)
      );

      // Go to result page
      navigate("/result");

    } catch (error) {
      console.error("Prediction error:", error);

      alert(
        "Unable to connect to the ML server. Please make sure the Flask backend is running."
      );

      setAnalyzing(false);
    }
  };

  return (
    <main className="prediction-page">

      <div className="prediction-container">

        <div className="prediction-top">

          <div>
            <span className="section-label">
              STEP 01 — SYMPTOM ANALYSIS
            </span>

            <h1>Select your symptoms</h1>

            <p>
              Choose all symptoms that you are currently experiencing.
            </p>
          </div>

          <div className="progress-box">
            <div className="progress-active">01</div>
            <span>Symptoms</span>

            <div className="progress-line"></div>

            <div>02</div>
            <span>Result</span>
          </div>

        </div>


        <div className="prediction-layout">

          {/* LEFT */}

          <section className="symptoms-panel">

            <div className="panel-title">

              <div>
                <h2>Available Symptoms</h2>
                <p>Search and select symptoms</p>
              </div>

              <span className="selected-count">
                {selected.length} selected
              </span>

            </div>


            <div className="search-box">

              <span>⌕</span>

              <input
                type="text"
                placeholder="Search symptoms..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />

            </div>


            <div className="symptom-grid">

              {filteredSymptoms.map((symptom) => (

                <button
                  key={symptom}
                  className={
                    selected.includes(symptom)
                      ? "symptom-button selected"
                      : "symptom-button"
                  }
                  onClick={() => toggleSymptom(symptom)}
                >

                  <span className="symptom-check">
                    {selected.includes(symptom) ? "✓" : ""}
                  </span>

                  {symptom}

                </button>

              ))}

            </div>

          </section>


          {/* RIGHT */}

          <aside className="selected-panel">

            <div className="panel-title">

              <div>

                <h2>Your Selection</h2>

                <p>
                  {selected.length === 0
                    ? "No symptoms selected"
                    : `${selected.length} symptom${
                        selected.length > 1 ? "s" : ""
                      } selected`}
                </p>

              </div>

              {selected.length > 0 && (

                <button
                  className="clear-button"
                  onClick={() => setSelected([])}
                >
                  Clear
                </button>

              )}

            </div>


            <div className="selected-list">

              {selected.length === 0 ? (

                <div className="empty-selection">

                  <div className="empty-symbol">
                    +
                  </div>

                  <h3>Nothing selected</h3>

                  <p>
                    Select symptoms from the list to begin your analysis.
                  </p>

                </div>

              ) : (

                selected.map((symptom) => (

                  <div
                    className="selected-item"
                    key={symptom}
                  >

                    <span>✓</span>

                    <p>{symptom}</p>

                    <button
                      onClick={() => toggleSymptom(symptom)}
                    >
                      ×
                    </button>

                  </div>

                ))

              )}

            </div>


            <button
              className="analyze-button"
              onClick={analyze}
              disabled={analyzing}
            >

              {analyzing ? (
                <>
                  <span className="button-spinner"></span>
                  Analyzing Symptoms...
                </>
              ) : (
                "Analyze Symptoms →"
              )}

            </button>


            <div className="prediction-warning">
              ⚠ This is an educational prediction and not a medical diagnosis.
            </div>

          </aside>

        </div>

      </div>

    </main>
  );
}

export default Prediction;