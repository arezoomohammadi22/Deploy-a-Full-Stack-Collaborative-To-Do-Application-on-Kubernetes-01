from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy
import redis

app = Flask(__name__)

# PostgreSQL configuration
app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql://admin:password@postgres:5432/tasks'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db = SQLAlchemy(app)

# Redis configuration
redis_client = redis.StrictRedis(host='redis', port=6379, decode_responses=True)

# Task model
class Task(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(255), nullable=False)
    completed = db.Column(db.Boolean, default=False)

# Initialize database
with app.app_context():
    db.create_all()

@app.route('/api/tasks', methods=['GET'])
def get_tasks():
    tasks = redis_client.get('tasks')
    if tasks:
        return jsonify(eval(tasks)), 200

    tasks = Task.query.all()
    tasks_list = [{"id": t.id, "title": t.title, "completed": t.completed} for t in tasks]
    redis_client.set('tasks', str(tasks_list))
    return jsonify(tasks_list), 200

@app.route('/api/tasks', methods=['POST'])
def create_task():
    data = request.get_json()
    task = Task(title=data['title'], completed=False)
    db.session.add(task)
    db.session.commit()
    redis_client.delete('tasks')  # Invalidate cache
    return jsonify({"id": task.id, "title": task.title, "completed": task.completed}), 201

@app.route('/api/tasks/<int:task_id>', methods=['PUT'])
def update_task(task_id):
    task = Task.query.get(task_id)
    if not task:
        return jsonify({"error": "Task not found"}), 404

    task.completed = not task.completed
    db.session.commit()
    redis_client.delete('tasks')  # Invalidate cache
    return jsonify({"id": task.id, "title": task.title, "completed": task.completed}), 200

@app.route('/health', methods=['GET'])
def health_check():
    return jsonify({"status": "healthy"}), 200

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)
