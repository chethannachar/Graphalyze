from flask import Flask, request, jsonify
import pandas as pd

app = Flask(__name__)

@app.route('/covid-data', methods=['POST'])
def covid_data():
    try:
        data = request.get_json()
        countries = data.get("countries", [])

        df = pd.read_csv(r"C:\Users\ADMIN\Downloads\country_wise_latest.csv")

        df["Total Recovered"] = df["Recovered"] + df["New recovered"]
        df["Total Deaths"] = df["Deaths"] + df["New deaths"]

        df = df.drop([
            "1 week % increase",
            "Recovered / 100 Cases",
            "Deaths / 100 Cases",
            "Deaths / 100 Recovered",
            "Confirmed last week",
            "WHO Region",
            "1 week change"
        ], axis=1)

        df["Recovery Rate"] = df["Total Recovered"] / df["Confirmed"] * 100
        df["Death Rate"] = df["Total Deaths"] / df["Confirmed"] * 100

        df_filtered = df[df["Country/Region"].isin(countries)]
        
        if df_filtered.empty:
            return jsonify({"error": "No data found for the selected countries"}), 404

        result = df_filtered[[
            "Country/Region", "Confirmed", "Total Recovered", "Total Deaths",
            "Recovery Rate", "Death Rate"
        ]].to_dict(orient="records")

        return jsonify(result)

    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True)
