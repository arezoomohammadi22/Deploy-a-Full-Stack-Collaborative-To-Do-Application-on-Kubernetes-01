# Collaborative To-Do Application

This practice is designed to help you deploy a full-stack application consisting of a **frontend**, **backend**, **database (PostgreSQL)**, and **cache (Redis)** on Kubernetes. You'll use **Docker** to containerize the application and Kubernetes to orchestrate it.

---

## **Project Overview**

You will deploy the following components:

1. **Frontend**: A React-based user interface.
2. **Backend**: A Flask-based API for managing tasks.
3. **Database**: PostgreSQL to store tasks persistently.
4. **Cache**: Redis for caching frequently accessed tasks and managing WebSocket-like functionalities.

---

## **Directory Structure**

```
collaborative-todo-app/
├── frontend/              # React application
│   ├── src/
│   │   ├── App.js
│   │   ├── App.css
│   │   └── index.js
│   └── public/
│       ├── index.html
├── backend/               # Flask backend application
│   ├── requirements.txt
│   └── app.py
├── postgres/              # PostgreSQL database container
├── redis/                 # Redis cache container
└── README.md              # This file
```

---

## **Objectives**

By completing this practice, you will learn how to:
1. Containerize applications using **Docker**.
2. Deploy applications on Kubernetes using **Deployments**.
3. Set up health checks using Kubernetes **readiness** and **liveness probes**.
4. Test communication between components inside a Kubernetes cluster.

---

## **Getting Started**

### **1. Clone the Repository**
```bash
git clone <repository-url>
cd collaborative-todo-app
```

### **2. Build Docker Images**

Navigate to each component's directory and build its Docker image.

#### Example for the Frontend:
```bash
cd frontend
docker build -t frontend:latest .
```

Repeat for the **backend**, **postgres**, and **redis** directories.

---

### **3. Deploy to Kubernetes**

Navigate to the `k8s/` directory and apply the Kubernetes deployment manifests.

```bash
kubectl apply -f backend-deployment.yaml
kubectl apply -f frontend-deployment.yaml
kubectl apply -f postgres-deployment.yaml
kubectl apply -f redis-deployment.yaml
```

---

### **4. Test the Application**

- Once deployed, the frontend will be accessible within your cluster.
- Access the logs of the backend, PostgreSQL, and Redis pods to confirm they are running and communicating.

---

## **Additional Notes**

1. **No Services Included**:
   - This practice omits Kubernetes **Services**. You will need to manually test pod communication.

2. **Pod-to-Pod Communication**:
   - Use `kubectl exec` to enter a pod and test connectivity (e.g., using `curl` or `ping`).

   Example:
   ```bash
   kubectl exec -it <frontend-pod-name> -- bash
   curl backend:5000/health
   ```

3. **Health Checks**:
   - The frontend and backend deployments include **readiness** and **liveness** probes. Modify the delay or interval if necessary.

---

## **Challenges**

1. **Add Kubernetes Services**:
   - Extend the project by adding **ClusterIP Services** to expose the backend, database, and Redis internally within the cluster.

2. **Scale the Application**:
   - Scale the frontend and backend deployments to handle more traffic.

3. **Test Resilience**:
   - Simulate failures by killing pods and observe how Kubernetes handles them.

---

## **Resources**

- [Kubernetes Documentation](https://kubernetes.io/docs/)
- [Docker Documentation](https://docs.docker.com/)
- [Flask Documentation](https://flask.palletsprojects.com/)
- [React Documentation](https://reactjs.org/docs/)

---

Good luck and happy learning! 🚀
