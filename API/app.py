from flask import Flask, request, jsonify
from flask_cors import CORS
import pymysql
import os
import logging

app = Flask(__name__)
print("Flask app initialized")
CORS(app)

logging.basicConfig(level=logging.INFO)

# MySQL configurations
db_user = os.getenv("MYSQL_USER")
db_password = os.getenv("MYSQL_PASSWORD")
db_name = os.getenv("MYSQL_DATABASE")
db_host = os.getenv("MYSQL_HOST")
db_port = int(os.getenv("MYSQL_PORT", 3306))

def get_db_connection():
    return pymysql.connect(host=db_host,
                           port=db_port,
                           user=db_user,
                           password=db_password,
                           database=db_name,
                           cursorclass=pymysql.cursors.DictCursor)

@app.route("/")
def index():
    return "Welcome to the EAP API!"

@app.route("/api/test", methods=["GET"])
def test_api():
    print("test success")
    return jsonify({"message": "test success"}), 200

@app.route("/api/data", methods=["POST"])
def store_data():
    print("store_data function called")
    conn = None
    try:
        conn = get_db_connection()
        with conn.cursor() as cursor:
            data = request.get_json()
            
            name = data.get("name")
            email = data.get("email")
            phone = data.get("phone")

            if not name or not email:
                return jsonify({"error": "Missing name or email"}), 400

            # Create table if it doesn't exist
            cursor.execute("""
            CREATE TABLE IF NOT EXISTS users_db (
                id INT AUTO_INCREMENT PRIMARY KEY,
                name VARCHAR(255) NOT NULL,
                email VARCHAR(255) NOT NULL,
                phone VARCHAR(20)
            )
            """)

            # Insert data into the table
            cursor.execute("INSERT INTO users_db (name, email, phone) VALUES (%s, %s, %s)", (name, email, phone))
            
        conn.commit()
        
        return jsonify({"message": "Data stored successfully"}), 201

    except Exception as e:
        print(f"An error occurred: {e}")
        return jsonify({"error": str(e)}), 500

    finally:
        if conn:
            conn.close()

if __name__ == "__main__":
    app.run(host='0.0.0.0', port=5000, debug=True)