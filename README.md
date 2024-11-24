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
3. **Include Probes**: Add readiness and liveness probes in your deployments to monitor application health.
4. Test communication between components inside a Kubernetes cluster.

---

## **Task Instructions**

### **1. Containerize the Application**

- Write `Dockerfile` for each component (`frontend`, `backend`, `postgres`, and `redis`).
- Build Docker images for each component.

### **2. Write Kubernetes Deployments**

- Create a **Deployment** for each component:
  - **Frontend**: Runs the React application.
  - **Backend**: Hosts the Flask API.
  - **PostgreSQL**: Serves as the database.
  - **Redis**: Provides caching functionality.

### **3. Include Probes in Your Deployments**

Each deployment **must include liveness and readiness probes** to monitor the health of pods. Use the following guidelines:
- **Frontend**:
  - Liveness Probe: Check if the app is running by accessing `/` on port `3000`.
  - Readiness Probe: Check if the app is ready to serve traffic by accessing `/` on port `3000`.
- **Backend**:
  - Liveness Probe: Monitor the `/health` endpoint on port `5000`.
  - Readiness Probe: Verify the `/health` endpoint on port `5000` is responding.
- **PostgreSQL**:
  - Use the `pg_isready` command to check the database health for both probes.
- **Redis**:
  - Use the `redis-cli ping` command for liveness and readiness checks.

### **4. Deploy the Application**

- Use `kubectl apply` to deploy the application in your Kubernetes cluster.
- Ensure all pods are running and healthy.

---

## **Testing and Validation**

1. **Probes**:
   - Simulate failures (e.g., crash a backend pod) and observe how Kubernetes restarts the pod based on the **liveness probe**.
   - Temporarily block the backend from responding to readiness checks and confirm Kubernetes removes it from service.

2. **Pod-to-Pod Communication**:
   - Test connectivity between components by using `kubectl exec` to enter a pod and send test requests.

3. **Logs**:
   - Use `kubectl logs` to view logs from each pod and debug any issues.

---

## **Challenges**

1. **Optimize Probes**:
   - Adjust the `initialDelaySeconds` and `periodSeconds` for better health check performance.

2. **Add Horizontal Pod Autoscaling (HPA)**:
   - Extend the application to scale automatically based on CPU or memory usage.

3. **Integrate Services**:
   - Extend the deployment to include Kubernetes **Services** for component communication.

---

## **Resources**

- [Kubernetes Probes](https://kubernetes.io/docs/tasks/configure-pod-container/configure-liveness-readiness-startup-probes/)
- [Docker Documentation](https://docs.docker.com/)
- [Flask Documentation](https://flask.palletsprojects.com/)
- [React Documentation](https://reactjs.org/docs/)

---

Good luck and happy learning! 🚀
