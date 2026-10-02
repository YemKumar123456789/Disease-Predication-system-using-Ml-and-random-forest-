import pandas as pd
import numpy as np
import pickle
import os

from sklearn.model_selection import train_test_split
from sklearn.preprocessing import LabelEncoder
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import (
    accuracy_score,
    classification_report,
    confusion_matrix
)


# ==========================================
# 1. LOAD DATASET
# ==========================================

print("Loading dataset...")

df = pd.read_csv("dataset/dataset.csv")

print("Original rows:", len(df))


# ==========================================
# 2. CLEAN COLUMN NAMES
# ==========================================

df.columns = df.columns.str.strip()


# ==========================================
# 3. CLEAN SYMPTOM VALUES
# ==========================================

symptom_columns = [
    column for column in df.columns
    if column.startswith("Symptom_")
]

for column in symptom_columns:

    df[column] = (
        df[column]
        .fillna("")
        .astype(str)
        .str.strip()
        .str.lower()
        .str.replace(" ", "_")
    )


# ==========================================
# 4. REMOVE EXACT DUPLICATES
# ==========================================

before = len(df)

df = df.drop_duplicates().reset_index(drop=True)

after = len(df)

print("\nDuplicate removal")
print("-------------------------")
print("Rows before:", before)
print("Rows after:", after)
print("Duplicates removed:", before - after)


# ==========================================
# 5. CREATE SYMPTOM VOCABULARY
# ==========================================

all_symptoms = set()

for column in symptom_columns:

    all_symptoms.update(
        symptom
        for symptom in df[column]
        if symptom != ""
    )

all_symptoms = sorted(all_symptoms)

print("\nUnique symptoms:", len(all_symptoms))


# ==========================================
# 6. CREATE FEATURE MATRIX
# ==========================================

X = np.zeros(
    (len(df), len(all_symptoms)),
    dtype=int
)

symptom_index = {
    symptom: index
    for index, symptom in enumerate(all_symptoms)
}


for row_index, row in df.iterrows():

    for column in symptom_columns:

        symptom = row[column]

        if symptom in symptom_index:

            X[
                row_index,
                symptom_index[symptom]
            ] = 1


# ==========================================
# 7. ENCODE DISEASE LABELS
# ==========================================

label_encoder = LabelEncoder()

y = label_encoder.fit_transform(
    df["Disease"]
)

print(
    "Number of diseases:",
    len(label_encoder.classes_)
)


# ==========================================
# 8. TRAIN / TEST SPLIT
# ==========================================

X_train, X_test, y_train, y_test = train_test_split(

    X,
    y,

    test_size=0.20,

    random_state=42,

    stratify=y
)


print("\nDataset split")
print("-------------------------")
print("Training samples:", len(X_train))
print("Testing samples:", len(X_test))


# ==========================================
# 9. TRAIN RANDOM FOREST
# ==========================================

print("\nTraining Random Forest model...")

model = RandomForestClassifier(

    n_estimators=200,

    random_state=42,

    n_jobs=-1
)

model.fit(
    X_train,
    y_train
)

print("Model training completed!")


# ==========================================
# 10. EVALUATE MODEL
# ==========================================

y_pred = model.predict(X_test)

accuracy = accuracy_score(
    y_test,
    y_pred
)


print("\n==========================================")
print("MODEL EVALUATION")
print("==========================================")

print(
    f"Accuracy: {accuracy * 100:.2f}%"
)


print("\nClassification Report:")

print(
    classification_report(
        y_test,
        y_pred,
        target_names=label_encoder.classes_,
        zero_division=0
    )
)


# ==========================================
# 11. CONFUSION MATRIX
# ==========================================

cm = confusion_matrix(
    y_test,
    y_pred
)

print("\nConfusion Matrix:")
print(cm)


# ==========================================
# 12. SAVE MODEL FILES
# ==========================================

os.makedirs(
    "model",
    exist_ok=True
)


with open(
    "model/disease_model.pkl",
    "wb"
) as file:

    pickle.dump(
        model,
        file
    )


with open(
    "model/label_encoder.pkl",
    "wb"
) as file:

    pickle.dump(
        label_encoder,
        file
    )


with open(
    "model/symptom_list.pkl",
    "wb"
) as file:

    pickle.dump(
        all_symptoms,
        file
    )


# ==========================================
# 13. COMPLETION MESSAGE
# ==========================================

print("\n==========================================")
print("MODEL FILES SAVED")
print("==========================================")

print(
    "model/disease_model.pkl"
)

print(
    "model/label_encoder.pkl"
)

print(
    "model/symptom_list.pkl"
)

print("\nTraining completed successfully!")